import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import 'dotenv/config';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if(req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, process.env.JWT_TOKEN!, (err) => {
      if (err) {
        res.status(401).json({error: 'Auth Error'})
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({error: 'Auth Error'});
  }
}
