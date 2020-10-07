import jwt from 'jsonwebtoken';

// user id is using for generating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
