import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <main>{children}</main>
          
          <Toaster position="top-left"/>
    </div>
  );
}
