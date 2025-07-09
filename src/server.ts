import app from "./App";
import {connectDB} from "./utils/database";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`the server is running at port ${PORT}`);
        });
    } catch(error){
        console.error("Error running the server", error);
    }
}

startServer();
