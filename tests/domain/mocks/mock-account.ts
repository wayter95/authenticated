import { AddAccount } from '@/domain/usecases/add-account'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.recent()
})

export const mockAccountModel = (): AddAccount.Result => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.recent()
})
