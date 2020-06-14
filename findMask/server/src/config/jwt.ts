import jwt from 'jsonwebtoken';

const createJWT= (email: string):string => {
  const token = jwt.sign(
    {
      email
    },
    process.env.JWT_TOKEN!,
    {expiresIn: '2day'}
  );
  return token;
}

export default createJWT;