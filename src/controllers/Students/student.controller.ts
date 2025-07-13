import { Request, Response } from "express";
import {createStudent, updateStudent, getStudentByUser, deleteStudent} from '../../services/Students/student.service';
import {CreateStudentRequest} from '../../Requests/Students/student.request';
import { BaseAPIResponse } from "../../utils/BaseAPIResponse.ts";
import { uptime } from "process";


export const addStudent = async (req: Request, res:Response)=>{
    const request = new CreateStudentRequest(req.body);
    const {valid, errors} = request.isValid();

    if(!valid){
        return res.status(400).json(BaseAPIResponse.error('validation failed', errors))
    }

    try{
        const userId = (req as any).userId;
        const student = await createStudent(userId, request.name, request.fatherName);
        return res.status(201).json(BaseAPIResponse.success("student added successfuly", student));
    } catch(error:any){
        return res.status(500).json(BaseAPIResponse.error("Failed to add student", [error.message]));
    }
};


export const getMyStudents = async(req:Request, res: Response)=>{
    try{
        const userId = (req as any).userId;
        const students = await getStudentByUser(userId);

        return res.status(200).json(BaseAPIResponse.success("Students fetched successfully", students));
    } catch(error:any){
        return res.status(500).json(BaseAPIResponse.error('failed to feth students', [error.message]))
    }
};

export const updateMyStudent = async(req:Request, res: Response)=>{
    try{
        const userId = (req as any).userId;
        const {studentId} = req.params;

        const update = await updateStudent(userId, studentId, req.body);

        if(!studentId){
            return res.status(404).json(BaseAPIResponse.error("Student not found"));
        }

        return res.status(200).json(BaseAPIResponse.success("Student upadted successfully", update));
    } catch(error:any){
        return res.status(500).json(BaseAPIResponse.error("Cannot update student", [error.message]));
    }
};

export const deleteMyStudent = async(req:Request, res:Response)=>{
    try{
        const userId = (req as any).userId;
        const {studentId} = req.params;

        await deleteStudent(userId, studentId);

        return res.status(200).json(BaseAPIResponse.success("Student deleted successfuly"));
        
    } catch(error: any){
        return res.status(500).json(BaseAPIResponse.error("Failed to delete student", [error.message]))
    }
}