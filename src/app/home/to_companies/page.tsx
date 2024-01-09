'use client'

import HomeHeader from "@/components/HomeHeader";
import TextAndImage from "@/components/TextAndImage";

import cuponIcon from "../../../assest/cupoun_icon.png"
import donationIcon from "../../../assest/donation_icon.png"

import babyOwl from "../../../assest/baby_owl.png"
import adultOwl from "../../../assest/adult_owl.png"
import eggOwl from "../../../assest/egg_owl.png"
import PlansContainer from "@/components/PlansContainer";
import { useState } from "react";

export default function(){

    const [showAnotherPlans, setShowAnotherPlans] = useState<boolean>(false);

    return (
        <main className="w-screen h-screen overflow-hidden flex flex-col">
            <HomeHeader />
            
            <section className="overflow-auto w-full h-full flex flex-col pb-8 scrollbar-thin scrollbar-thumb-azulsel">
                <TextAndImage 
                title={"Estimule a aprendizagem!"} 
                text={"Os usuários ganham pontos a medida que interagem com o sistema.\nEsses pontos podem ser trocados por cupons que as empresas disponibilizam."} 
                buttonAction={() => {}} buttonText={"Ver planos"} image={cuponIcon} textDirection="left"  />
                
                <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

                <TextAndImage 
                title={"Faça sua parte"} 
                text={"Algumas instituições possuem uma lista de necessidades.\nSe você pode contribuir, doe! A sua contribuição pode mudar a vida de muitos alunos."} 
                buttonAction={() => {}} buttonText={"Doar"} image={donationIcon} textDirection="right"  />

                <div className="mt-16 mb-6 h-1 w-4/5 bg-azul self-center text-transparent">A</div>

                <div className="flex flex-col mt-4 gap-6 items-center justify-center">
                    <h1 className="text-8xl font-bold text-center text-azul dark:text-azulsel">Planos</h1>

                    <div className="flex flex-row items-center justify-center gap-4">
                        <PlansContainer title="Plano mensal (comum)" access="Acesso por 30 dias" cupons="Poste até 50 cupons" visibility="Visibilidade comum" value="R$ 30,00" image={babyOwl} />
                        <PlansContainer title="Plano anual (comum)" access="Acesso por 365 dias" cupons="Poste até 600 cupons" visibility="Visibilidade comum" value="R$ 360,00" image={adultOwl} />
                        <PlansContainer title="Plano customizado" access="Acesso de no mínimo 7 dias" cupons="Escolha quantos cupons" visibility="Escolha a visibilidade" value="R$ A definir" image={eggOwl} />
                    </div>

                    <button className="bg-azul p-2 px-5 text-white rounded-xl transition-colors duration-500 hover:bg-verde dark:bg-azulsel" onClick={() => {setShowAnotherPlans(!showAnotherPlans)}}>Mostrar outros planos</button>
                    
                    {
                        (showAnotherPlans) &&
                        <div className="flex flex-row items-center justify-center gap-4">
                            <PlansContainer title="Plano mensal (plus)" access="Acesso por 30 dias" cupons="Poste até 100 cupons" visibility="Cupons em destaque" value="R$ 60,00" image={babyOwl} hueRotate />
                            <PlansContainer title="Plano anual (plus)" access="Acesso por 365 dias" cupons="Poste até 1200 cupons" visibility="Cupons em destaque" value="R$ 720,00" image={adultOwl} hueRotate />
                        </div>
                    }
                </div>

            </section>
        </main>
    )
} 