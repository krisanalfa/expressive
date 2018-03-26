import { debug } from './../instances/debug'
import { Sequelize } from 'sequelize-typescript'
import { databaseConfig } from './../config/database'

const config = databaseConfig.connections[databaseConfig.connection]

export const sequelize = new Sequelize({
  dialect: config.dialect,
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  modelPaths: [ __dirname + '/../models/' ],
  logging: process.env.NODE_ENV === 'production' ? false : debug,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName: true
  }
})
