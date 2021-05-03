export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    tourist_secret: process.env.JWT_SECRET_TOURIST,
    expiresIn: '1d',
  },
};
