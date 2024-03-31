import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) =>{
    try {
        const payload = {
            userId: user.id,
            email: user.email
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn : '7h'
        });

        return token
    } catch (error) {
        console.log(error);
    }
}