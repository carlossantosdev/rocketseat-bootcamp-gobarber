export default {
  jwt: {
    secretKey: process.env.APP_SECRET || 'default',
    expiresIn: '1d'
  }
}
