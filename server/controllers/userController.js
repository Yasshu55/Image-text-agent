import {User} from '../models/User.js';

// create user 

export const createUser = async (req, res) => {
    try {
        const {userName,email,password} = req.body;
        console.log("Entered  : ",  userName + "  , " + email , "    Password:  "+ password);
        const user = await User.findOne({where : {email : email}})
        if(user){
            return res.status(409).json('User already exists');
        }
        const newUser = await User.create({userName,email,password})
        res.status(201).json(newUser)
    } catch (error) {
        console.log('Error in Saving the user: ', error);
        res.status(500).json({ error: error.message });
    }
}

// update user password

export const updateUser = async (req,res) => {
    try {
        const {email,password,newPassword} = req.body;
        console.log("Entered :    ",email, password, newPassword);
        const user = await User.findOne({where : {email : email}})
        if(user){
            if(user.password === password){
                user.password = newPassword
                await user.save();
                console.log("SuccessFully changed");
                res.sendStatus(200);
            } else {
                return res.status(401).json({message: "Incorrect password"})
            }
        } else {
            console.log("User not Found");
        }
    } catch (error) {
        console.log('Error in updating user password: ', error);
        res.status(500).json({ error: error.message });
    }
}
