const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient();

async function main(){
  try{
    await db.category.createMany({
      data: [
        {name: "Computer Science"},
        {name: "Fitness"},
        {name: "General Sports"},
        {name: "Bets"},
        {name: "Maths"},
        {name: "Languages"},
        {name: "Music"},
        {name: "E-Sports"},
        {name: "Health"},
        {name: "Mindfullness"},
        {name: "Nutrition"},
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