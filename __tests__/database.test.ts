import { sequelize } from './../src/instances/sequelize'

describe('Database', () => {
  test('Can authenticate', async () => {
    sequelize.authenticate().then(() => expect(true).toBe(true))
      .catch(() => expect(false).toBe(true))
  })
})
