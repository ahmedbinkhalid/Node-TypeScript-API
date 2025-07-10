import mongoose, {Document, Schema} from 'mongoose';

export interface IStudent extends Document{
    name: string,
    fatherName: string,
    rollno: number,
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date
}

const StudentSchema: Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    rollno:{
        type: Number,
        required: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps:{
            createdAt:true, updatedAt:false
        }
    }
);

// Ensure unique RollNo per user 

StudentSchema.index({createdBy: 1, rollno:1}, {unique:true});

export const Student = mongoose.model<IStudent>('Student', StudentSchema);