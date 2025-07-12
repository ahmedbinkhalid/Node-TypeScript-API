import { Request, Response } from "express";
import {createStudent, updateStudent, getStudentByUser, deleteStudent} from '../../services/Students/student.service';
import {CreateStudentRequest} from '../../Requests/Students/student.request';
import { BaseAPIResponse } from "../../utils/BaseAPIResponse.ts";


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