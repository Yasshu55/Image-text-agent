import {User} from '../models/User.js';
import {generateToken} from '../utils/generateToken.js';
import bcrypt from 'bcrypt';

// create user 

export const createUser = async (req, res) => {
    try {
        const {userName,email,password,confirmPassword} = req.body;

        console.log("Entered  : ",  userName + "  , " + email , "    Password:  "+ password);
        const user = await User.findOne({where : {email : email}})
        if(user){
            return res.status(409).json('User already exists');
        }
        if(password !== confirmPassword ){
            return res.status(400).json({msg:"Passwords do not match"});
        }
        // hash the pass
        const hashedPassword = await bcrypt.hash(password,12);

        const newUser = await User.create({userName,email,password:hashedPassword})
        // generate and send token
        const token = generateToken(newUser);

        // Send success response with token
        return res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.log('Error in Saving the user: ', error);
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            console.log("Incomplete email or password");
            return res.status(404).json("Please provide both username and password")
        }

        const user = await User.findOne({where : {email : email}});
        if(!user){
            console.log("Does not exist user");
            return res.status(400).json({message: "User does not exist!"})
        }
        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return  res.status(400).json({message: "Invalid credentials"})
        }
        const token = await generateToken(user)
        res.header('auth-token', token).send(user)
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
