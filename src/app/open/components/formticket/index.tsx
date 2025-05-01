"use client";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CardCustomerProps } from "../../page";
import { FiLoader } from "react-icons/fi";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(5, "Descreva um pouco sobre seu problema..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CardCustomerProps;
}

export default function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    reset();
  }
  return (
    <form
      className="bg-slate-200 mt-6 py-6 px-4 rounded border-2 border-gray-300 flex flex-col"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="mb-1 font-medium" htmlFor="name">
        Nome do chamado
      </label>
      <Input
        register={register}
        name="name"
        type="text"
        error={errors.name?.message}
        placeholder="Digite o nome do chamado"
        className="border-gray-400"
      />

      <label className="my-1 font-medium" htmlFor="description">
        Descreva o problema
      </label>
      <Input
        register={register}
        name="description"
        type="text"
        error={errors.description?.message}
        placeholder="Descreva um pouco sobre seu problema..."
        className="border-gray-400 resize-none h-24"
        typeInput="textarea"
      />

      <button
        className="bg-blue-500 text-white w-full font-medium rounded h-11 px-2 flex items-center justify-center mt-4 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
        type="submit"
      >
        Enviar
        {
          isSubmitting && (
            <FiLoader className="animate-spin ml-2" size={16} color="#fff" />
          )
        }
      </button>
    </form>
  );
}
