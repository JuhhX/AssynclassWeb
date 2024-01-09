'use client'

import ContractPlan from "@/components/ContractPlan";
import { SideBarCompany } from "@/components/SideBarCompany";
import { getUserName } from "@/lib/user/user";
import { useState, useEffect } from "react";

enum PlanTypes{
    MONTHLY_NORMAL,
    YEARLY_NORMAL,
    MONTHLY_PLUS,
    YEARLY_PLUS,
    CUSTOM,
    VOID
}

export default function Plan(){

    const [company, setCompany] = useState<Company | null>(null);
    const [changePlan, setChangePlan] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            fetch(`http://localhost:3333/company/${res.id}`)
            .then(json => json.json())
            .then(data => {
                setCompany(data)
                console.log(data.plan.planType)
            })
        });
    }, []);

    function resolvePlanType(type: number){
        
        const planType : string[] = ["MENSAL COMUM", "ANUAL COMUM", "MENSAL PLUS", "ANUAL PLUS", "CUSTOM"];
        
        return planType[type];
    }

    return(
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">

            {
                (company) ?
                    (company.plan.planType == PlanTypes.VOID) ? 
                        <ContractPlan company={company} title="ESCOLHA UM PLANO" />
                    : 
                        <div className="w-[70%] border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                            <h1 className={`text-azul text-3xl font-bold mb-4`}>{`INFORMAÇÕES SOBRE SEU PLANO`}</h1>
                            <p className="text-xl mt-2 text-azul dark:text-azulsel">{`Você ainda pode postar ${company.plan.cuponsAvailable} cupons`}</p>
                            <p className="text-xl mt-2 text-azul dark:text-azulsel">{`Inicio do plano em ${company.plan.startedIn}`}</p>
                            <p className="text-xl mt-2 text-azul dark:text-azulsel">{`Plano finaliza em ${company.plan.endsIn}`}</p>
                            <p className="text-xl mt-2 text-azul dark:text-azulsel">{`Tipo do plano: ${resolvePlanType(company.plan.planType)}`}</p>
                            <p className="text-xl mt-2 text-azul dark:text-azulsel">{`Cupons com destaque: ${(company.plan.visibility) ? "SIM" : "NÃO"}`}</p>
                            <button onClick={() => setChangePlan(!changePlan)} className="text-xl bg-azul rounded-xl p-4 font-bold text-white mt-4 w-1/4">Alterar plano</button>
                        </div>
                : null
            }

            {
                (changePlan) &&
                <ContractPlan company={company} title="ALTERE SEU PLANO" />
            }

            <SideBarCompany />
        </main>
    );
}