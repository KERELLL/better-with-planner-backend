export const config = () => ({
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
});
