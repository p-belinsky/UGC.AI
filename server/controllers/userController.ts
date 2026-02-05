import {Request, Response} from "express";
import {prisma} from "../configs/prisma.js";

export const getUserCredits = async (req:Request, res:Response) => {
    try {

        const {userId} = req.auth()
        if(!userId){
            return res.status(401).json({message: 'Not authorized'})
        }

        const user = await prisma.user.findUnique({where: {id: userId}})

        return res.json({credits: user?.credits})

    }catch (error: unknown){
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({message})
    }
}

export const getAllProjects = async (req:Request, res:Response) => {
    try {

        const {userId} = req.auth()
        if(!userId){
            return res.status(401).json({message: 'Not authorized'})
        }

        const projects = await prisma.project.findMany({where: {userId}, orderBy: {createdAt: 'desc'}})

        return res.json({projects})

    }catch (error: unknown){
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({message})
    }
}

export const getProjectById = async (req:Request, res:Response) => {
    try {

        const {userId} = req.auth()
        if(!userId){
            return res.status(401).json({message: 'Not authorized'})
        }

        const {projectId} = req.params;

        if (typeof projectId !== 'string') {
            return res.status(400).json({message: 'Invalid project ID'})
        }

        const project = await prisma.project.findFirst({
            where: {id: projectId, userId}
        })

        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }

        return res.json({project})

    }catch (error: unknown){
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({message})
    }
}

export const toggleProjectPublic = async (req:Request, res:Response) => {
    try {
        const {userId} = req.auth()
        if(!userId){
            return res.status(401).json({message: 'Not authorized'})
        }

        const {projectId} = req.params;

        if (typeof projectId !== 'string') {
            return res.status(400).json({message: 'Invalid project ID'})
        }

        const project = await prisma.project.findFirst({
            where: {id: projectId, userId}
        })

        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }

        if(!project?.generatedImage && !project?.generatedVideo){
            return res.status(404).json({message: 'image or video not generated'})
        }

        await prisma.project.update({
            where: {id: projectId},
            data: {isPublished: !project.isPublished}
        })

        return res.json({isPublished: !project.isPublished})

    }catch (error: unknown){
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({message})
    }
}