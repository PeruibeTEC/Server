export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    business_secret: process.env.JWT_BUSINESS_SECRET,
    expiresIn: '1d',
  },
};
