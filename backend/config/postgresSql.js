import prisma from "../prisma/client.js";

export const connectPostgresDB = async () => {
    try{
        await prisma.$connect(process.env.DATABASE_URL);
        console.log("Connected to Postgres database successfully");
    }catch(err){
        console.log("Error connecting to Postgres database",err);
    }
}