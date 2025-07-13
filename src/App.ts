import express from "express";
import userRoutes from './Routes/Authentication/user.routes'
import studentRoutes from './Routes/Students/student.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));;

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res)=>{
    res.send("API is up and running");
});

export default app;
