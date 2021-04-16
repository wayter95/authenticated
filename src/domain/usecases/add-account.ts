import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (accountData: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    createdAt: Date
  }
  export type Result = AccountModel
}
