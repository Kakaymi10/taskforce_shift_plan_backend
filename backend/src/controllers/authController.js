import dotenv from 'dotenv';
import db from '../../models/index';
import { hashPassword, generateToken } from '../utils/auth-helper';


dotenv.config();

const { User } = db;

class AuthController {


    static async login(req, res) {
        try{
            const {email,password} = req.body;

            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if(!user){
                return res.status(404).json({
                    status: 404,
                    error: 'User not found',
                });
            }

            const hashedPassword = hashPassword(password);

            if(hashedPassword !== user.password){
                return res.status(401).json({
                    status: 401,
                    error: 'Incorrect password',
                });
            }

            const token = generateToken({id: user.id, email: user.email, role: user.role})
           

            return res.status(200).json({
                status: 200,
                message: 'User logged in successfully',
                data: {
                    token,
                },
            });

        }catch(error){
            return res.status(500).json({
                status: 500,
                error: error.message,
            });
        }

    }

}

export default AuthController;