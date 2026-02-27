-- Create Message table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."Message" (
    "id" SERIAL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Index for faster retrieval
CREATE INDEX IF NOT EXISTS "Message_userId_idx" ON "public"."Message"("userId");
