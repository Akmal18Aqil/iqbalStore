import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="admin-container">
      <AdminSidebar email={user?.email} />

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
