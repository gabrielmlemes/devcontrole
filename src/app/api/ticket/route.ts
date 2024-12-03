import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// http://localhost:3000/api/ticket
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Ticket não localizado" },
      { status: 400 },
    );
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json(
      { message: " Ticket atualizado com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Ticket não localizado" },
      { status: 400 },
    );
  }
}
