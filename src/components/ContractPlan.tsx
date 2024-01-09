import PlansContainer from "./PlansContainer";

import babyOwl from "../assest/baby_owl.png"
import adultOwl from "../assest/adult_owl.png"
import eggOwl from "../assest/egg_owl.png"
import { useState } from "react";
import CustomPlanEditor from "./CustomPlanEditor";

interface ContractPlanProps{
    company: Company | null
    title: string
}

export default function ContractPlan(props: ContractPlanProps){

    const [openCustomPlan, setCustomPlan] = useState<boolean>(false);

    function updatePlan(type: number){
        console.log(type);
        if(props.company){
            fetch(`http://localhost:3333/company/${props.company.companyID}/plan`, {
                method: "PUT",
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
                },
                body: JSON.stringify(
                    {
                        planType: type
                    }
                )
            })
            .then(data => {
                if(data.status == 200){
                    alert("Plano atualizado com sucesso");
                    window.location.reload();
                }
                else
                    alert("Falha ao alterar plano");
            })
        }
    }



    return (
        <>
            <h1 className={`text-azul text-3xl font-bold`}>{props.title}</h1>
            <div className="flex flex-row flex-wrap gap-4 w-4/5 h-full justify-center">
                <PlansContainer title="Plano mensal (comum)" access="Acesso por 30 dias" cupons="Poste até 50 cupons" visibility="Visibilidade comum" value="R$ 30,00" image={babyOwl} type={0} style={"w-1/3 flex flex-col bg-slate-200 p-6 py-8 rounded-xl"} onInteract={updatePlan} />
                <PlansContainer title="Plano anual (comum)" access="Acesso por 365 dias" cupons="Poste até 600 cupons" visibility="Visibilidade comum" value="R$ 362,00" image={adultOwl} type={1} style={"w-1/3 flex flex-col bg-slate-200 p-6 py-8 rounded-xl"} onInteract={updatePlan} />
                <PlansContainer title="Plano mensal (plus)" access="Acesso por 30 dias" cupons="Poste até 100 cupons" visibility="Cupons em destaque" value="R$ 100,00" image={babyOwl} hueRotate type={2} style={"w-1/3 flex flex-col bg-slate-200 p-6 py-8 rounded-xl"} onInteract={updatePlan} />
                <PlansContainer title="Plano anual (plus)" access="Acesso por 365 dias" cupons="Poste até 1200 cupons" visibility="Cupons em destaque" value="R$ 630,00" image={adultOwl} hueRotate type={3} style={"w-1/3 flex flex-col bg-slate-200 p-6 py-8 rounded-xl"} onInteract={updatePlan} />
                <PlansContainer title="Plano customizado" access="Acesso de no mínimo 7 dias" cupons="Escolha quantos cupons" visibility="Escolha a visibilidade" value="R$ A definir" image={eggOwl} type={4} style={"w-1/3 flex flex-col bg-slate-200 p-6 py-8 rounded-xl"} onInteract={() => setCustomPlan(true)} />
            </div>

            {
                openCustomPlan &&
                <CustomPlanEditor openEditor={setCustomPlan} company={props.company} />
            }
        </>
    );
}