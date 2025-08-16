import { PrismaClient } from "@prisma/client"

const prisma= new PrismaClient()

async function main(){
    await prisma.user.deleteMany()
   const users= await prisma.user.create({
    data: {
        name:"Anand",
        email:"Anand@21",
        age:21,
        userPreference:{
            create:{
                emailUpdates:true
            }
        }
    },
    select:{
        name:true,
        userPreference:{select:{id:true}}
    }
   })
   
   const find=await prisma.user.findUnique({
    where:{
        age_name:{
            age:22,
            name:"Anand"
        }
    }
   })
   console.log(find)
}
main()
.catch(e=>{
    console.error(e.message)
})
.finally(async()=>{
    await prisma.$disconnect()
})
