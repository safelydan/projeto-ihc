module.exports = {
  api_url: process.env.API_URL || 'http://localhost:3000/api',
  database: process.env.DB_NAME || 'realTimeBusMon',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'hyperballad',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false
}
