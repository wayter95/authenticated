export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vacina-pet',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'V@C1N4_P3T=N3WT3CH0FF021'
}
