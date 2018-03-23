interface Connection {
  host: string
  database: string
  username: string
  password: string
  dialect: string
}

interface Config {
  connection: string

  connections: {
    [key: string]: Connection
  }
}

export const databaseConfig = {
  connection: process.env.DB_CONNECTION || 'mysql',

  connections: {
    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: 'mysql'
    }
  }
} as Config
