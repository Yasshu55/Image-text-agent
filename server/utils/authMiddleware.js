import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import dotenv from 'dotenv';
dotenv.config();


export const authMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[2];
      console.log("Token : ", token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await User.findOne({where :{id : userId}});
      console.log("Success");
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authenticated' });
    }
  };

