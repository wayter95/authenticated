import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const account = await sut.add(addAccountParams)
      expect(account).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account.id).toBeTruthy()
    })

    test('Should return null if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.loadByEmail(faker.internet.email())
      expect(exists).toBeNull()
    })
  })
})
