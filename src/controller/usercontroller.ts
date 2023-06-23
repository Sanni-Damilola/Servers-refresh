import express, {Request, Response} from "express"
import models from "../model/userModel"
import bcrypt from "bcrypt"
import { enviromentvariables } from "../enviromentvariable/enviromentvariable"


export const register = async (req: Request, res: Response) => {
    try {

        const adminPasword = enviromentvariables.Password

        const { name, password, email , isAdmin } = req.body
        
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(adminPasword, salt)


        const created = await models.create({
            name,
            password: hashed,
            email,
            isAdmin: false
        })

        return res.status(200).json({
            message: password === adminPasword ? "Admin created" : "not an Admin",
            data: password === adminPasword ? created : null
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "An error occured",
            data: error,
            err : error.message
        })
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const adminPasword = enviromentvariables.Password
        const { email, password } = req.body;

        const checkUser = await models.findOne({ email: email })
        
        if (checkUser) {
            return res.status(200).json({
                message: password === adminPasword ? "Admin created" : "not an Admin",
                data: password === adminPasword ? checkUser : null
            })

            
        } else {
            return res.status(400).json({
                message: "user not foud"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "user not found"
        })
    }
}
export const getall = async (req: Request, res: Response) => {
    try {
        const users = await models.find()

        return res.status(200).json({
            message: "users gotten",
            data: users
        })
    } catch (error) {
        return res.status(404).json({
            message: "no users"
        })
    }
}
