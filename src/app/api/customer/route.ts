import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Rotas: http://localhost:3000/api/customer

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
    console.log(error);

    return NextResponse.json(
      { error: "Failed to created new customer" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 400 },
    );
  }

  const findTickets = await prisma.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });

  if (findTickets) {
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 401 },
    );
  }

  try {
    await prisma.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 400 },
    );
  }
}
