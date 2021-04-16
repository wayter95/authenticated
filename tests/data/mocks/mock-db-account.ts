import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/data/protocols/db/account'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: AddAccountRepository.Result

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false
  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: LoadAccountByEmailRepository.Result

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
