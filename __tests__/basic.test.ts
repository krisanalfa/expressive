import { app } from './../src/app'
import * as request from 'supertest'

describe('Routes: Index', () => {
  test('Index is good', async done => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)

    done()
  })
})
