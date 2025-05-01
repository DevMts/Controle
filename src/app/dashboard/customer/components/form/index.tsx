"use client";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5})[-\s]?(\d{4})$/;
      return phoneRegex.test(value);
    },
    {
      message: "O número de telefone deve estar no formato (99) 99999-9999",
    },
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ user }: { user: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    const response = await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address || "",
      userId: user,
    });

    reset();
    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit((data) => handleRegisterCustomer(data))}
    >
      <label className="mb-1 text-lg font-medium">Nome Completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 mt-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Ex: (99) 99999-9999"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço Completo</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        register={register}
      />

      <button
        className={
          `bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold` +
          (isSubmitting ? " opacity-50 cursor-not-allowed" : "")
        }
        type="submit"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2 justify-center">
            Cadastrando{" "}
            <span className="animate-spin">
              <FiLoader />
            </span>
          </span>
        ) : (
          "Cadastrar"
        )}
      </button>
    </form>
  );
}
