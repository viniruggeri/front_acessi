"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import TemaEscuro from "./temaEscuro";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isPaginaInicial = pathname === "/";
  const isPaginaLogin = pathname === "/login";
  const isPaginaCadastrar = pathname === "/cadastro";

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleClickFora = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
    } else {
      document.removeEventListener("mousedown", handleClickFora);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [menuAberto]);

  return (
    <>
      <div className="bg-black h-[75px] flex items-center justify-between">
        {/* Escondendo o botão do menu de hambúrguer na página de login, mas mantendo o espaço */}
        <div className={`ml-24 ${isPaginaLogin || isPaginaCadastrar || isPaginaInicial ? "invisible" : ""}`}>
          <button className="text-white" aria-label="Menu" onClick={toggleMenu}>
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white rounded"></span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          {pathname !== "/login" && pathname !== "/cadastro" ? (
            <Link href="/home">
              <Image src="/images/logo.png" width={80} height={0} alt="Logo" />
            </Link>
          ) : (
            <Image src="/images/logo.png" width={80} height={0} alt="Logo" />
          )}
        </div>
        <div className="flex items-center text-white text-sm mr-24 gap-4">
          <TemaEscuro />
          {isPaginaLogin || pathname === "/" ? (
            <Link
              href="/login"
              className="bg-white text-black px-4 py-1 rounded text-sm font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
          ) : (
            <Link href="/atualizarCadastro">
              <Image
                src="/images/usuario_branco.png"
                width={30}
                height={30}
                alt="perfil"
              />
            </Link>
          )}
        </div>
      </div>

      {/* MENU LATERAL: Aqui escondemos o menu se estiver na página /login, mas mantendo o espaço */}
      <div
        ref={menuRef}
        className={`absolute top-0 left-0 w-[300px] h-full bg-gray-300 dark:bg-slate-700 dark:text-white border-2 border-gray-900 
                    ${isPaginaLogin ? "invisible" : (menuAberto ? "block" : "hidden")} transition-all ease-in-out duration-300`}
        style={{ zIndex: 999 }}
      >
        <div className="flex justify-end p-6">
          <button className="text-white text-3xl" onClick={toggleMenu}></button>
        </div>

        <div className="flex flex-col place-items-end mr-3">

          {/* Outros links só aparecem se NÃO estiver na página de login */}
          {!isPaginaLogin && (
            <>
              <div className="flex items-center gap-[180px]">
                <Image src="/images/home.png" width={30} height={0} alt="Ícone da página inicial" />
                <Link href="/home" className="text-lg">
                  Home
                </Link>
              </div>
              <div className="w-full border-t border-gray-700 dark:border-gray-600 my-2"></div>
              <div className="flex items-center gap-[57px]">
                <Image src="/images/mapa.png" width={30} height={0} alt="Ícone de mapa do metrô e trem" />
                <Link href="/mapaMetro" className="text-lg">
                  Mapa do Metrô/Trem
                </Link>
              </div>
              <div className="w-full border-t border-gray-700 dark:border-gray-600 my-2"></div>
              <div className="flex items-center gap-[100px]">
                <Image src="/images/falar.png" width={30} height={0} alt="Ícone para pedir ajuda à Ceci" />
                <Link href="/chatCeci" className="text-lg">
                  Falar com a Ceci
                </Link>
              </div>
              <div className="w-full border-t border-gray-700 dark:border-gray-600 my-2"></div>
              <div className="flex items-center gap-[140px]">
                <Image src="/images/usuario.png" width={30} height={0} alt="Ícone de integrantes da equipe" />
                <Link href="/integrantes" className="text-lg">
                  Integrantes
                </Link>
              </div>
              <div className="w-full border-t border-gray-700 dark:border-gray-600 my-2"></div>

              {isLoggedIn && (
                <div className="flex items-center gap-[130px] cursor-pointer" onClick={handleLogout}>
                  <Image src="/images/deslogar.png" width={30} height={0} alt="Ícone para desconectar" />
                  <span className="text-lg">Desconectar</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
