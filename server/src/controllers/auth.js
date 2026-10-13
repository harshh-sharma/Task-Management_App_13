const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    try{
    const {name, email, password} = req.body;
    console.log("ksahdksf")

    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message:"All feilds are required"
        })
    }

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            success: false,
            message:"user is already exist",
            data:{}
        })
    }
    
    const normilizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
        name, 
        email: normilizedEmail,
        password: hashedPassword
    })

    if(!user){
        return res.status(400).json({
            success: false,
            message:"something went wrong while creating user",
            data:{}
        })
    }

    return res.status(200).json({
        success: true,
        message:"user successfully created",
        data: user
    })


    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong"
        })
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"All feilds are required",
                data:{}
            })
        }

        const user = await User.findOne({email});

        console.log(user.password, password);
        
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("isPasswordMatch00", isPasswordMatch);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message:"Invalid credentials",
                data:{}
            })
        }

        const token = jwt.sign(
            {id: user?._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE}
        );

        const data = {
            name: user.name,
            email: user.email,
            token
        }

        return res.status(200).json({
            success: true,
            message:"User successfully login",
            data
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

const profile = async (req, res) => {
    try{
        const {id} = req.user;

        const user = await User.findById(id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found",
                data:{}
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully get user profile",
            data:user
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"something went wrong",
            data:{}
        })
    }
}

module.exports = {
    register,
    login,
    profile
}