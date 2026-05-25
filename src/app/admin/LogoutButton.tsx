"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout} 
      className="admin-nav-item"
      style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
