import express from "express";
import userRoutes from './Routes/Authentication/user.routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));;

app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send("API is up and running");
});

export default app;
