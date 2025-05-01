"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";
import { useTransition } from "react";

export function ButtonRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(() => {
          router.refresh();
        });
      }}
      className={`
        flex items-center justify-center
        p-2 rounded-full
        bg-zinc-800 hover:bg-zinc-700
        transition-colors duration-300
        text-white shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      disabled={isPending}
      aria-label="Recarregar página"
    >
      <FiRefreshCw
        size={20}
        className={`
          ${isPending ? "animate-spin" : ""}
          transition-transform
        `}
      />
    </button>
  );
}
