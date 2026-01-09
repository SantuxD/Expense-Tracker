const User = require('../models/User.models');


const jwt = require('jsonwebtoken');


const  generateToken  = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const registerUser = async (req, res) => {
    const {fullname, email, password,} = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }   
        const user = await User.create({fullname, email, password});
        if(user){
            return res.status(201).json({   
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                token: generateToken(user._id),
            });
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }       

    
};


const loginUser = async (req, res) => {}


const getUserInfo = async (req, res) => {};

module.exports = { registerUser, loginUser, getUserInfo };