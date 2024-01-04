'use client'

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function CouponsList(){

    const [coupons, setCoupons] = useState<Coupons[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            if(res.id == "-1")
                window.location.href = "/login";
            else{
                fetch(`http://localhost:3333/coupons`)
                .then(r => r.json())
                .then(data => {
                    if(data)
                        setCoupons(data);
                    else
                        setCoupons([]);
                    setLoaded(true);
                });
            }
        })

    }, []);

    function requestCoupon(companyID: string, couponID: string){

        getUserName().then(res => {
            fetch(`http://localhost:3333/use_coupon`, {
                method: "POST",
                body: JSON.stringify({
                    id: companyID,
                    coupon_id: couponID,
                    user_id: res.id,
                    user_type: Number(res.type)
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.status == 401){
                    alert("Você não tem pontos suficientes!");
                }
                else{
                    alert(`Seu código é: ${data.code}`);
                    window.location.reload();
                }
            })
        })

    }

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Cupons</h1>
            {
                (!loaded) ? 
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                        wrapperClass="blocks-wrapper"
                        colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                    />
                : 
                (coupons.length == 0) ?
                    <h1 className="text-azul text-xl dark:text-azulsel">{"NENHUMA EMPRESA POSTOU UM CUPOM AINDA 🙁"}</h1>
                : 
                    coupons.map((c, i) => {
                        if(c){
                            return (
                                <div key={i} className="w-full border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                                    <h1 className="text-azul text-xl font-semibold dark:text-azulsel">{c.couponName}</h1>
                                    <p className="text-azul text-lg dark:text-azulsel">{c.couponDescription}</p>
                                    <p className="text-azul text-lg dark:text-azulsel">{"Cupom por: " + c.byCompany}</p>
                                    <p className="text-azul text-lg dark:text-azulsel">{"Por " + c.couponValue + " pontos."}</p>
                                    <div className="flex flex-row w-full mt-4 justify-end gap-3">
                                        <button className="self-end inline-block" onClick={() => {requestCoupon(c.byCompany, c.couponID)}}><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></button>
                                    </div>
                                </div>
                              )
                        }
                    })
            }

            <button className="fixed bottom-2 left-2 bg-azul cursor-pointer transition-colors rounded-xl p-4 text-xl text-white hover:bg-azulsel">Contato com suporte</button>

            <SideBar type="aluno" />
        </main>
    )

}