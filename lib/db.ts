import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}
export const db = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.prisma = db

//? WHY? Cuando estamos en desarrollo se crearian varias instancias de prisma, debido al hotReload

//** tambien podria hacerse con el siguiente codigo
/* 
const db = new PrismaClient() pero de esta manera estariamos generando una nueva instancia con cada reload
*/
