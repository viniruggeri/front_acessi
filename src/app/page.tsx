"use client";
import Image from "next/image";
import Card from "./components/card";

export default function PaginaInicial() {

  return (
    <>
      <Image 
        src="/images/banner.png" 
        alt="logo" 
        width={1400} 
        height={600} 
        style={{ width: '100%', height: 'auto' }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 m-8">
        <Card 
          icone="🚨" 
          titulo="Alertas em tempo real" 
          descricao="Fique por dentro de qualquer mudança no trajeto."
        />
        <Card 
          icone="🗺️" 
          titulo="Mapa" 
          descricao="Acesse o mapa do metrô e trem para planejar sua viagem."
        />
        <Card 
          icone="💬" 
          titulo="Falar com a Ceci" 
          descricao="Receba ajuda instantânea com a assistente Ceci."
        />
        <Card
          icone="🌍"
          titulo=" Acessível e inclusiva"
          descricao="Pra todo mundo se informar e pedir ajuda, sem barreiras."
        />
      </div>

      <div
        className="text-center font-bold text-xl sm:text-2xl lg:text-3xl transition-opacity"
      >
        <p className="mt-16 mb-8 text-gray-800 dark:text-white">
          Acessi é <span className="text-yellow-500">acessibilidade</span> para todos e{" "}
          <span className="text-green-600">inovação</span> para o mundo.
        </p>

      </div>
      <div className="mb-10 text-center">
        <p className="text-black dark:text-white text-lg mb-8">
          Pronto para explorar? Faça login e aproveite todos os recursos!
        </p>
        <a
          href="/login"
          className="bg-green-600 text-xl text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition"
        >
          Fazer Login
        </a>
    </div>

    </>
  );
}
