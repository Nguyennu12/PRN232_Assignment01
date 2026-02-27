const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    const sql = fs.readFileSync('create_message_table.sql', 'utf8');
    console.log('Executing SQL...');
    // Split by ; and execute each statement
    const statements = sql.split(';').filter(s => s.trim().length > 0);
    for (const statement of statements) {
        await prisma.$executeRawUnsafe(statement);
        console.log('Executed statement.');
    }
    console.log('Done!');
    process.exit(0);
}

main().catch(err => {
    console.error('Error executing SQL:', err);
    process.exit(1);
});
