'use client'

import { SideBarCompany } from "@/components/SideBarCompany";
import { getUserName } from "@/lib/user/user";
import { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CouponsUsageChart{
    couponID: string
    companyID: string
    numberOfCupons: number
    usedCoupons: number
    couponName: string
    usedByStudents: number
    usedByTeachers: number
    usedByInstitutions: number
}

interface CouponsUsageChart1 {
    couponID: string
    companyID: string
    numberOfCupons: number
    usedCoupons: number
    couponName: string
}

interface CouponsUsageChart2 {
    couponID: string
    companyID: string
    couponName: string
    numberOfCupons: number
    usedByStudents: number
    usedByTeachers: number
    usedByInstitutions: number
}

export default function Charts(){

    const [usageChart, setUsageChart] = useState<CouponsUsageChart1[]>([]);
    const [usageChart2, setUsageChart2] = useState<CouponsUsageChart2[]>([]);
    const chartsLoaded = useRef(
        {
            chart1: false,
            chart2: false,
        }
    );

    useEffect(() => {
        getUserName()
        .then(resp => {
            fetch(`http://localhost:3333/coupon_usage/${resp.id}`)
            .then(json => json.json())
            .then(data => {
                let chart1 : CouponsUsageChart1[] = [];
                let chart2 : CouponsUsageChart2[] = [];
                data.forEach((d : CouponsUsageChart) => {
                    chart1.push(
                        {
                            companyID: d.companyID,
                            couponID: d.couponID,
                            couponName: d.couponName,
                            numberOfCupons: d.numberOfCupons,
                            usedCoupons: d.usedCoupons
                        }
                    );
                    
                    chart2.push(
                        {
                            companyID: d.companyID,
                            couponID: d.couponID,
                            couponName: d.couponName,
                            usedByStudents: d.usedByStudents,
                            usedByTeachers: d.usedByTeachers,
                            usedByInstitutions: d.usedByInstitutions,
                            numberOfCupons: d.numberOfCupons
                        }
                    );
                });

                setUsageChart(chart1);
                chartsLoaded.current.chart1 = true;
                setUsageChart2(chart2);
                chartsLoaded.current.chart2 = true;
            });
        })
    }, [])

    return(
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">
            <h1 className={`text-azul text-3xl mb-4`}>Uso por grupo de cupons: </h1>

            {
                (!chartsLoaded.current.chart1) ? 
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                    wrapperClass="blocks-wrapper"
                    colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                />
                :
                <>
                    {
                        (usageChart.length > 0) ?
                            <ResponsiveContainer width={"70%"} height={400}>
                                <BarChart data={usageChart}>
                                    <XAxis dataKey={"couponName"} />
                                    <YAxis dataKey={"numberOfCupons"} />
                                    <Tooltip wrapperStyle={{backgroundColor: "rgba(0.5 0.5 0.5 0.2)"}} />
                                    <Legend />
                                    <Bar dataKey={"usedCoupons"} fill="#33c7a1" width={32} />
                                    <Bar dataKey={"numberOfCupons"} fill="#2e34a6" width={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        : <h1 className="text-azul text-xl dark:text-azulsel">Você ainda não postou nenhum cupom</h1>
                    }
                </>
            }

            <h1 className={`text-azul text-3xl mb-4`}>Uso por tipo de usuário: </h1>
            {
                (!chartsLoaded.current.chart2) ? 
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                    wrapperClass="blocks-wrapper"
                    colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                />
                :
                <>
                    {
                        (usageChart2.length > 0) ?
                            <ResponsiveContainer width={"70%"} height={400}>
                                <BarChart data={usageChart2}>
                                    <XAxis dataKey={"couponName"} />
                                    <YAxis dataKey={"numberOfCupons"} />
                                    <Tooltip wrapperStyle={{backgroundColor: "rgba(0.5 0.5 0.5 0.2)"}} />
                                    <Legend  />
                                    <Bar dataKey={"usedByStudents"} fill="#33c7a1" width={32} />
                                    <Bar dataKey={"usedByTeachers"} fill="#2e34a6" width={32} />
                                    <Bar dataKey={"usedByInstitutions"} fill="#0aa4bf" width={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        : <h1 className="text-azul text-xl dark:text-azulsel">Você ainda não postou nenhum cupom</h1>
                    }
                </>
            }

            <SideBarCompany />
        </main>
    );
}