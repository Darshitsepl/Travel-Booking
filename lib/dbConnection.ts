import mongoose from "mongoose";

const createConnection = async () => {
    try {
        await mongoose.connect(process.env.MONDOGB_URL as string);
        console.log('Database connection up')
    } catch (error) {
        console.error(error);
    }
}


export default createConnection