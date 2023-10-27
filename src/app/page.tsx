'use client'

import { useEffect } from "react"
import { useTheme } from "next-themes";
import Image from "next/image";

import logo from "../assest/logo.png";
import gamification_image from "../assest/gamefication_image.png";
import whiteboard_image from "../assest/whiteboard_image.png";
import icon_dinheiro from "../assest/Icon_dinheiro.jpg";

import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export default function Home() {
  
  const {setTheme} = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col">
      <header className="text-azul flex flex-row h-20 text-xl border-b-4 border-azul rounded-b-lg dark:border-azulsel">
        <div className="w-1/4 p-3 flex flex-row justify-center items-center">
          <p className="font-bold text-3xl dark:text-azulsel">Assynclass</p>
        </div>

        <div className="w-1/2 p-3 flex flex-row justify-end items-center gap-6">
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Novidades</button>
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Para empresas</button>
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Sobre nós</button>
        </div>
        
        <div className="w-1/4 p-3 flex flex-row justify-end items-center gap-6 pr-5">
          <a href="/register/school" className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Cadastro</a>
          <a href="/login" className="bg-azul p-2 px-5 text-white rounded-xl transition-colors duration-500 hover:bg-verde dark:bg-azulsel">Login</a>
        </div>

      </header>
      
      <section className="overflow-auto w-full h-full flex flex-col scrollbar-thin scrollbar-thumb-azulsel">
        <section className="w-full flex flex-col">
          <div className="flex flex-row h-96">
            <div className="w-1/2 p-6 items text-center flex flex-col leading-relaxed justify-center text-azul gap-4 dark:text-azulsel">
              <h1 className="text-4xl font-bold">Aprenda no seu ritmo</h1>
              <p className="text-2xl w-1/2 self-center">Estude de forma dinâmica, focando nas suas maiores dificuldades</p>
              <button className="text-white bg-azul p-4 rounded-xl text-xl w-1/2 self-center dark:bg-azulsel">Entenda sobre</button>
            </div>
            <div className="w-1/2  p-6 text-center leading-relaxed flex flex-col">
              <Image src={logo} alt="Logo do assynclass" className="self-center w-1/2 h-full" />
            </div>
          </div>

          <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

          <div className="flex flex-row h-96 p-10">
            <Image src={whiteboard_image} alt="Imagem de demonstração da lousa digital" className="w-1/2" />
            <div className="w-1/2 h-full flex flex-col gap-6 p-6 text-azul dark:text-azulsel">
              <h1 className="text-4xl font-bold text-center">Organize o conteúdo</h1>
              <p className="text-2xl text-center">Você professor pode organizar ou apresentar seu conteúdo de forma dinâmica utilizando a lousa digital.</p>
              <p className="text-2xl text-center">É possível escrever textos, desenhar, carregar vídeos e muito mais!</p>
              <button className="text-white bg-azul p-4 rounded-xl text-xl w-1/2 self-center dark:bg-azulsel">Ler mais sobre</button>
            </div>
          </div>

          <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

          <div className="flex flex-row h-96 p-10">
            <div className="w-1/2 h-full flex flex-col gap-6 p-6 text-azul dark:text-azulsel">
              <h1 className="text-4xl font-bold text-center">Aprenda enquanto joga</h1>
              <p className="text-2xl text-center">Jogue minigames baseados nas suas dificuldades e obtenha pontos.</p>
              <p className="text-2xl text-center">Também é possível criar seus próprios minigames!</p>
              <button className="text-white bg-azul p-4 rounded-xl text-xl w-1/2 self-center dark:bg-azulsel">Ler mais sobre</button>
            </div>
            <Image src={gamification_image} alt="Imagem de demonstração do sistema de gamificação" className="w-1/2" />
          </div>

          <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

          <div className="flex flex-row h-96 p-10">
            <Image src={icon_dinheiro} alt="Imagem de demonstração do sistema de gamificação" className="w-1/2" />
            <div className="w-1/2 h-full flex flex-col gap-6 p-6 text-azul dark:text-azulsel">
              <h1 className="text-4xl font-bold text-center">Troque pontos por cupons</h1>
              <p className="text-2xl text-center">Que tal comprar aquilo que tanto deseja trocando seus pontos por cupons?</p>
              <p className="text-2xl text-center">Ganhe pontos superando os obstáculos!</p>
              <button className="text-white bg-azul p-4 rounded-xl text-xl w-1/2 self-center dark:bg-azulsel">Ler mais sobre</button>
            </div>
          </div>
      
          <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

          <footer className="text-azul flex flex-row h-20 text-xl border-t-4 border-azul rounded-t-lg dark:border-azulsel">
            <div className="w-1/4 p-3 flex flex-row justify-center items-center">
              <p className="font-bold text-lg dark:text-azulsel">&#169; Assynclass</p>
            </div>
            <div className="w-3/4 p-3 flex flex-row justify-end items-center pr-5 gap-6">
              <Instagram size={32} className="cursor-pointer transition-colors duration-500 dark:text-azulsel hover:text-verde" />
              <Facebook size={32} className="cursor-pointer transition-colors duration-500 dark:text-azulsel hover:text-verde" />
              <Twitter size={32} className="cursor-pointer transition-colors duration-500 dark:text-azulsel hover:text-verde" />
              <Youtube size={32} className="cursor-pointer transition-colors duration-500 dark:text-azulsel hover:text-verde" />
            </div>
          </footer>
        </section>
      </section>

    
    </main>
  )
}
