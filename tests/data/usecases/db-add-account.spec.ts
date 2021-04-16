import { HasherSpy,LoadAccountByEmailRepositorySpy,AddAccountRepositorySpy } from '@/tests/data/mocks'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { DbAddAccount } from '@/data/usecases'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(hasherSpy,addAccountRepositorySpy,loadAccountByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should Call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.params).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest,
      createdAt: addAccountParams.createdAt
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return account if LoadAccountByEmailRepository returns null', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = null
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should Call LoadAccountByEmailRepository with correct email', async () => {
    const { sut,loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  test('Should return false if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = mockAccountModel()
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(null)
  })
})
