'use client'

import { ItemList } from "@/app/instituition/donations_list/page";
import { SideBarCompany } from "@/components/SideBarCompany";
import ToDonate_Item from "@/components/ToDonate_Item";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

interface ToDonateItem{
    name: string 
    id: number, 
    itens_list: ItemList[]
}

export default function Donations(){

    const [donateTo, setDonateTo] = useState<ToDonateItem[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    const [current, setCurrent] = useState<number>(-1);

    useEffect(() => {
        fetch("http://localhost:3333/to_donate")
        .then(res => res.json())
        .then(data => {
            setDonateTo(data);
            setLoaded(true);
        });
    }, []);

    function openCurrentDonationList(id: number){
        setCurrent((current == id) ? -1 : id);
    }

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">

            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Lista de instituições para doações</h1>

            <div className="overflow-auto w-full scrollbar-thin scrollbar-thumb-azulsel">
                {
                    !isLoaded ? 
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                            wrapperClass="blocks-wrapper"
                            colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                        />
                    :
                        (donateTo.length > 0) ? 
                            donateTo.map(d => (
                                <div key={d.id}>
                                    <div  className="w-4/5 p-4 rounded-lg flex flex-row border-2 border-b-4 bg-transparent border-azul mt-4">
                                        <div  className="w-[90%] h-full flex flex-col gap-3">
                                            <p className="text-azul text-xl font-bold dark:text-azulsel">{"INSTITUIÇÃO: " + d.name}</p>
                                            <p className="text-azul text-lg dark:text-azulsel">{`Deseja ${d.itens_list.length} itens.`}</p>
                                        </div>
                                        <button onClick={() => openCurrentDonationList(d.id)} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></button>
                                    </div>
                                    {
                                        (current == d.id) &&
                                            <div className="overflow-auto w-full scrollbar-thin scrollbar-thumb-azulsel">
                                                {
                                                    d.itens_list.map(i => {
                                                        return <ToDonate_Item key={i.item_id} id={i.item_id} item_name={i.item} description={i.description} />
                                                    })
                                                }
                                            </div>
                                    }
                                </div>
                            ))
                        : <h1 className="text-azul text-xl dark:text-azulsel">{"NENHUMA INSTITUIÇÃO CRIOU UMA LISTA AINDA ..."}</h1>
                    
                }
            </div>

            <SideBarCompany />
        </main>
    );
}