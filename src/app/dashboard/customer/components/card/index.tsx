"use client";
import { api } from "@/lib/api";
import type { CardCustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer(dados: CardCustomerProps) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      const reponse = await api.delete("/api/customer", {
        params: {
          id: dados.id,
        },
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border rounded-lg p-2 gap-2 hover:scale-101 duration-300">
      <h2>
        <span className="font-bold">Nome:</span> {dados.name}
      </h2>
      <p>
        <span className="font-bold">Email:</span> {dados.email}
      </p>
      <p>
        <span className="font-bold">Telefone:</span> {dados.phone}
      </p>
      <button
        className="bg-red-500 px-4 rounded text-white self-start"
        type="button"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  );
}
