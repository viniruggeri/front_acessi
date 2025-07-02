"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [tipoSelecionado, setTipoSelecionado] = useState<"Passageiro" | "Colaborador" | null>(null);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "Login";
    const tipoSalvo = localStorage.getItem("tipoUsuario") as "Passageiro" | "Colaborador" | null;
    if (tipoSalvo) {
      setTipoSelecionado(tipoSalvo);
    }
  }, []);

  const selecionarTipo = (tipo: "Passageiro" | "Colaborador") => {
    localStorage.setItem("tipoUsuario", tipo);
    setTipoSelecionado(tipo);

    // Dispara evento personalizado para avisar o layout que mudou
    window.dispatchEvent(new Event("tipoUsuarioChange"));
  };

  const entrar = async () => {
    if (tipoSelecionado && usuario && senha) {
      try {
        const headersList = {
          "Content-Type": "application/json",
        };

        const bodyContent = JSON.stringify({
          email: usuario,
          senha: senha,
        });

        const response = await fetch("https://quarkus-teste-production-5988.up.railway.app/usuario/login", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });

        const data = await response.json(); // Importante: parsear como JSON

        if (response.ok) {
          // Armazena o token no localStorage
          localStorage.setItem("token", data.token);
          router.push("/home");
        } else {
          setErro(data.message || "Erro ao realizar login");
        }
      } catch (error) {
        setErro("Erro na requisição");
        console.error(error);
      }
    } else {
      alert("Por favor, preencha o email e a senha.");
    }
  };

  return (
    <>
      <main className="flex flex-col items-center mt-10">
        <div className="flex justify-center gap-5">
          <button
            onClick={() => selecionarTipo("Passageiro")}
            className="bg-black dark:border-2 dark:border-white text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
          >
            Passageiro
          </button>
          <button
            onClick={() => selecionarTipo("Colaborador")}
            className="bg-red-700 dark:border-2 dark:border-white text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            Colaborador
          </button>
        </div>

        <form
          method="post"
          encType="multipart/form-data"
          className="w-full max-w-sm bg-slate-50 dark:bg-gray-700 p-6 rounded-lg shadow-md mt-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label htmlFor="txtUsuario" className="block text-gray-700 dark:text-white font-bold mb-2">
              Usuário
            </label>
            <input
              type="text"
              name="txtUsuario"
              required
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="txtSenha" className="block text-gray-700 dark:text-white font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              name="txtSenha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {erro && (
          <div className="text-red-500 text-center mt-2">
            <p>{erro}</p>
          </div>
        )}

        <div className="flex justify-center gap-5 mt-5">
          <a href="/cadastro" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition">
            Cadastrar
          </a>
          <button
            onClick={entrar}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            Entrar
          </button>
        </div>
        <div className="mt-3 text-center mb-10">
          <a href="/esqueciSenha" className="text-sm text-blue-500 hover:underline">
            Esqueci minha senha...
          </a>
        </div>
      </main>
    </>
  );
}
