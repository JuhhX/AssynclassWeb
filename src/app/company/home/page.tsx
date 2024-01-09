'use client'

import { SideBarCompany } from "@/components/SideBarCompany";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";

enum PlanTypes{
    MONTHLY_NORMAL,
    YEARLY_NORMAL,
    MONTHLY_PLUS,
    YEARLY_PLUS,
    CUSTOM,
    VOID,
}

export default function CompanyHome(){

    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        getUserName().then(res => {
            fetch(`http://localhost:3333/company/${res.id}`)
            .then(json => json.json())
            .then(data => {
                setCompany(data)
            })
        });
    }, []);

    return(
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">

            <h1 className={`text-azul text-3xl`}>{`Olá ${(company?.companyName) ? company.companyName : "Carregando ..."}`}</h1>

            {
                (company) ?
                    (company.plan.planType == PlanTypes.VOID) ?
                        <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
                            <h1 className="text-azul text-xl font-bold">{"VOCÊ AINDA NÃO CONTRATOU UM PLANO!"}</h1>
                            <p className="text-verde text-lg">{"Contrate um plano para que possa postar cupons. É fácil!"}</p>
                            <a href={`/company/plan`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                        </div>
                    : 
                        <>
                            <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
                                <h1 className="text-azul text-xl font-bold">{"Veja seu progresso!"}</h1>
                                <p className="text-verde text-lg">{"Analise os gráficos e veja seu desempenho."}</p>
                                <a href={``} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                            </div>
                            <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
                                <h1 className="text-azul text-xl font-bold">{"Seu plano"}</h1>
                                <p className="text-verde text-lg">{"Fique atento as condições do seu plano"}</p>
                                <a href={`/company/plan`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                            </div>
                            <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
                                <h1 className="text-azul text-xl font-bold">{"Doe"}</h1>
                                <p className="text-verde text-lg">{"Que tal doar algo para alguém que precisa?"}</p>
                                <a href={`/company/donations`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                            </div>
                        </>
                : null
            }

            <SideBarCompany />
        </main>
    )

}