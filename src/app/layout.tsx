"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";
import MenuTopo from "./components/menuTopo";
import MenuTopoColaborador from "./components/menuTopoColaborador";
import Header from "./components/header";
import HeaderColaborador from "./components/headerColaborador";
import Footer from "./components/footer";
import FooterColaborador from "./components/footerColaborador";
import VLibras from "./components/VLibras";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    setTipoUsuario(tipo);
    
    const rotasPublicas = ["/login", "/esqueciSenha"];
    
    // Se não estiver logado e a página não for pública, redireciona
    if (!tipo && !rotasPublicas.includes(pathname)) {
      router.push("/login");
    }

    setIsLoading(false);

    const handleTipoChange = () => {
      setTipoUsuario(localStorage.getItem("tipoUsuario"));
    };

    window.addEventListener("tipoUsuarioChange", handleTipoChange);
    return () => {
      window.removeEventListener("tipoUsuarioChange", handleTipoChange);
    };
  }, [pathname, router]);

  if (isLoading) return null;

  return (
    <html lang="pt-br">
      <body className="bg-white dark:bg-gray-900">
        {tipoUsuario === "Colaborador" ? <HeaderColaborador /> : <Header />}

        {pathname !== "/" && pathname !== "/login" && pathname !== "/esqueciSenha" && pathname !== "/cadastro" &&
          (tipoUsuario === "Colaborador" ? <MenuTopoColaborador /> : <MenuTopo />)}

        {children}

        {tipoUsuario === "Colaborador" ? <FooterColaborador /> : <Footer />}
        <VLibras />
      </body>
    </html>
  );
}
