import { authOptions } from "@/lib/auth";
import primaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { string } from "zod";

// Cadastrar um novo cliente
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await primaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address || "",
        userId,
      },
    });

    return NextResponse.json({ message: "Cliente Cadastradoi com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Failed crete new customer" }, { status: 400 });
  }
}

// Apagar um cliente
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const findTickets = await primaClient.ticket.findMany({
    where: {
      customerId: id,
    },
  });

  if (findTickets) {
    return NextResponse.json({ error: "Customer has tickets" }, { status: 400 });
  }

  try {
    await primaClient.customer.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Cliente apagado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Failed delete customer" }, { status: 400 });
  }
}

// Obter um cliente
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  try {
    const customer = await primaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json({ error: "Failed get customer" }, { status: 400 });
  }
}
