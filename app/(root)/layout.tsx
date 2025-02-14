import Home from "./page";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="lg:px-[30px]">
      <Navbar />
      <Home />
    </main>
  );
}
