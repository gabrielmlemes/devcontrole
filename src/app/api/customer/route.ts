import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await req.json();

  try {
    await prisma.customer.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "CLIENTE CADASTRADO" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to created new customer" },
      { status: 400 }
    );
  }
}
