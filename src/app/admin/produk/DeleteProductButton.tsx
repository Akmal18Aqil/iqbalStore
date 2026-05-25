"use client";

import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.")) {
      await supabase.from("products").delete().eq("id", id);
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="admin-btn-icon admin-btn-icon-danger" title="Hapus Produk" style={{ border: "none", cursor: "pointer" }}>
      <Trash2 size={18} />
    </button>
  );
}
