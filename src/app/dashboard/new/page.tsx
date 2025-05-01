import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customer = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(data: FormData) {
    "use server";
    const name = data.get("name");
    const description = data.get("description");
    const customer_id = data.get("customer");

    if (!name || !description || !customer_id) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customer_id as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="bg-gray-900 text-white px-4 py-1 rounded">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label htmlFor="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-md px-2 h-11 mb-2"
            placeholder="Nome do chamado"
            required
            name="name"
          />
          <label htmlFor="mb-1 font-medium text-lg">Descreva o problema</label>
          <textarea
            className="w-full border-2 border-gray-200 rounded-md px-2 h-24 resize-none mb-2"
            placeholder="Descreva o problema"
            required
            name="description"
          />

          {customer.length > 0 && (
            <>
              <label htmlFor="mb-1 font-medium text-lg">Cliente</label>
              <select
                className="w-full border-2 border-gray-200 rounded-md px-2 h-11 mb-2"
                name="customer"
              >
                <option disabled>Selecione um cliente</option>
                {customer.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customer.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda nao possui nenhum cliente cadastrado,
              <span className="text-blue-500 font-medium"> Cadastrar Cliente</span>
            </Link>
          )}

          <button
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={customer.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
