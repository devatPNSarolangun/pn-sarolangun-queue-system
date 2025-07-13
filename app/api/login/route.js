import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Find user in DB
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    // On success (don't return password)
    const { password: _, ...userWithoutPassword } = user;
    return Response.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login API error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
