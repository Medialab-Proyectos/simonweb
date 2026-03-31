import type { Metadata } from "next";
import { TrackerSidebar } from "@/components/tracker/sidebar";

export const metadata: Metadata = {
  title: "KPI UX Performance Tracker | Simon Movilidad",
  description: "Herramienta interna de medición y estimación de desempeño del equipo UX.",
};

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <TrackerSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
