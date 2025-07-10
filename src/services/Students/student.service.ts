import mongoose from 'mongoose';
import {Student,IStudent} from '../../Models/student';

// Create Student for a specific user

export const createStudent = async(
    userId: string,
    name: string,
    fatherName: string,
): Promise<IStudent> =>{

    // Get the max RollNo for a specific user 

    const lastStudent = await Student.findOne({createdBy: userId})
    .sort({rollno: -1})
    .limit(1);

    const nextRollNo = lastStudent ? lastStudent.rollno + 1 : 1;

    // Create a new student

    const newStudent = new Student({
        name,
        fatherName,
        rollno: nextRollNo,
        createdBy: new mongoose.Types.ObjectId(userId)
    })

    return await newStudent.save();
};

// Get student by a specific user 

export const getStudentByUser = async(
    userId: string
): Promise<IStudent[]> =>{
    return await Student.find({createdBy: userId}).sort({rollno: 1});
}

// Update Studet 

export const updateStudent = async(
    studentId: string,
    userId: string,
    update: Partial<IStudent>
): Promise<IStudent | null> =>{
    const updated = await Student.findOneAndUpdate({
        _id: studentId, createdBy: userId
    },
    {new: true}
    );
    return updated;
};

// Delete Student





