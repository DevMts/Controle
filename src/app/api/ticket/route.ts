import { authOptions } from "@/lib/auth";
import primaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await primaClient.ticket.findFirst({
    where: {
      id,
    },
  });

  if (!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  try {
    await primaClient.ticket.update({
      where: {
        id,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Ticket fechado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Failed update ticket" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  console.log(customerId, name, description);

  if (!customerId || !name || !description) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    await primaClient.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: "ABERTO",
      },
    });

    return NextResponse.json({ message: "Ticket criado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Failed update ticket" }, { status: 400 });
  }
}
