import { PrismaClient } from "@prisma/client";
//Not hard reload in production mode
//Everytime rerender in production mode, it's gonna call a hard reload
declare global {
    var prisma: PrismaClient | undefined;
}

//declare function ? globalThis?
//Call database as prisma. globalThis 
export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;