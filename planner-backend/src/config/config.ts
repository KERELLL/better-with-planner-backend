export const config = () => ({
    mongoUri: process.env.DATABASE_URI,
    jwtSecret: process.env.JWT_SECRET
})