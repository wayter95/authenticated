import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Wayter',
          email: 'wayter.paulo.95@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Wayter',
          email: 'wayter.paulo.95@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(403)
    })
  })
})
