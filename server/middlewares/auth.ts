import {Request, Response, NextFunction} from "express";

export const protect = async (req:Request, res:Response, next:NextFunction)=> {
    try {
        const {userId} = req.auth()

        if(!userId){
            return res.status(401).json({message: 'Not authorized'})
        }
        next()
    }catch (error: unknown){
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(401).json({message})

    }
}