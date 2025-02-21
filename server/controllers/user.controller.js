import { response } from "express";
import bcryptjs from 'bcryptjs'
import UserModel from "../models/user.model.js";
import verifyEmailTemplate from "../utlils/verifyEmailTemplate.js"
import sendEmail from "../config/sendEmail.js";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;


        if(!name || !email || !password) {
            return res.status(400).json({
                message: "provide email, name and password!",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if(user) {
            return res.json({
                message: "User Already Exists",
                error: true,
                success: false
            })
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashedPassword
        }




        const newUser = await UserModel(payload);
        const save = await newUser.save();


        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?.id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify your email from Blinkit",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.json({
            message: "User Registered Successfully",
            error: false,
            success: true,
            data: save
        })

    }
    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}