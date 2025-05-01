import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import { ButtonRefresh } from "./components/button";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id
      }
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center gap-2">
            <ButtonRefresh />
            <Link href="/dashboard/new" className="bg-blue-500 text-white px-4 py-1 rounded">
              Abrir Chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <td className="font-medium text-left pl-1">CLIENTE</td>
              <td className="font-medium text-left hidden sm:table-cell">DATA CADASTRO</td>
              <td className="font-medium text-left">STATUS</td>
              <td className="font-medium text-left">#</td>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer} />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="px-2 text-gray-500 mt-2">Você não possui nenhum chamado aberto</p>
        )}
      </main>
    </Container>
  );
}
