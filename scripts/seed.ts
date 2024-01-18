const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient();

async function main(){
  try{
    await db.category.createMany({
      data: [
        {name: "Photography"},
        {name: "Films"},
      ]
    })
    console.log("Success")
  } catch(error){
    console.log("Error seeding the database categories", error)
  } finally {
    await db.$disconnect()
  }
}

main();