export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    business_secret: process.env.JWT_BUSINESS_SECRET,
    tourist_secret: process.env.JWT_SECRET_TOURIST,
    expiresIn: '1d',
  },
};
