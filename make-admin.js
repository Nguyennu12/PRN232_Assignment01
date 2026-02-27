const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const emailToPromote = process.argv[2];

async function main() {
    if (!emailToPromote) {
        console.error("Please provide an email: node make-admin.js your-email@example.com");
        process.exit(1);
    }

    try {
        const user = await prisma.user.update({
            where: { email: emailToPromote },
            data: { role: "ADMIN" },
        });
        console.log(`Successfully promoted ${user.email} to ADMIN!`);
    } catch (error) {
        console.error("Error promoting user:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
