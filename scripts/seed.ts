const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try{
        await db.category.createMany({
            data: [
                {name: "Computer Science",},
                {name: "AWS",},
                {name: "Web developement",},
                {name: "Personality Developement",},
                {name: "Next.js Master Baseter",},
                {name: "Projects",},
                {name: "Video Editing",},
            ]
        })
        console.log("Database connected");
    }catch(err){
        console.log(`Error while seeding the category in db`,err);
    } finally{
        await db.$disconnect();
    }
}

main()