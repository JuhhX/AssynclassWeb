'use client'
import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { data } from "autoprefixer";
import { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Bar, Cell, ComposedChart, Customized, Legend, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Game_Content_View{
    id: string,
    teacherID: string,
    title: string,
    contentType: number,
    view: number,
}

interface ActivitiesStatus{
    gameName: string,
    gameID: string,
    expected: number,
    done_by: number
}

export default function TeacherCharts(){

    const [viewChart, setViewChart] = useState<Game_Content_View[]>([]);
    const [activitiesDone, setActivitiesDone] = useState<ActivitiesStatus[]>([]);
    const contentLoaded = useRef(
        {
            chart1: false,
            chart2: false
        }
    )

    useEffect(() => {
        getUserName().then(resp => {
            fetch(`http://localhost:3333/teacher/${resp.id}/view_charts`)
            .then(json => json.json())
            .then(data => {
                setViewChart(data);
                contentLoaded.current.chart1 = true;
            })
            
            fetch(`http://localhost:3333/teacher/${resp.id}/done_activities_chart`)
            .then(json => json.json())
            .then(data => {


                setActivitiesDone(data);
                contentLoaded.current.chart2 = true;
            })
        })
    }, []);

    const CustomTooltip = (props: any) => {
        let { active, payload, label } = props;

        if (active && payload && payload.length) {
          return (
            <div className="border-azul border-2 rounded-xl border-b-4 p-2">
              <p className="label">{`${label}`}</p>
              <p className="desc">{"visualizações: " + payload[0].payload.view}</p>
              <p className="desc">{(payload[0].payload.contentType) ? "Tipo: Jogo/Atividade" : "Tipo: Conteúdo da lousa"}</p>
            </div>
          );
        }
    }

    const CustomTooltip2 = (props: any) => {
        let { active, payload, label } = props;

        if (active && payload && payload.length) {
          return (
            <div className="border-azul border-2 rounded-xl border-b-4 p-2">
              <p className="label">{`${label}`}</p>
              <p className="text-verde">{"Atribuido para " + payload[0].payload.expected + " alunos."}</p>
              <p className="text-azul">{"Feito por " + payload[0].payload.done_by + " alunos."}</p>
            </div>
          );
        }
    }

    const Custom = (props: any) => {

        return(
            props.data.map((d: Game_Content_View, i: number) => {
                return (
                    <Rectangle key={d.id} x={props.xAxisMap[0].x} y={props.orderedTooltipTicks[i].coordinate - 10} offset={90} width={props.formattedGraphicalItems[0].props.data[i].width} height={20} fill={(!d.contentType) ? "#33c7a1" : "#2e34a6"} />
                );
            })
        )
    };

    return (
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">

            <h1 className={`text-azul text-3xl mb-4`}>Visualização de jogos e conteúdos: </h1>

            {
                (!contentLoaded.current.chart1) ? 
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
                        (viewChart.length > 0) ?      
                            <ResponsiveContainer width={"70%"} height={400}>
                                <ComposedChart layout="vertical" width={500} height={400} data={viewChart}>
                                    <XAxis type="number" dataKey={"view"} />
                                    <YAxis dataKey="title" type="category" />
                                    <Tooltip content={CustomTooltip} />
                                    <Bar dataKey="view" barSize={20} fill={"#413ea0"} />
                                    <Customized component={Custom} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        : <h1 className="text-azul text-xl dark:text-azulsel">Você ainda não postou conteúdo</h1>
                    }
                </>
            }

            <h1 className={`text-azul text-3xl mb-4`}>Porcentagem de alunos que fizeram atividades: </h1>

            {
                (!contentLoaded.current.chart2) ? 
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
                        (activitiesDone.length > 0) ?      
                            <ResponsiveContainer width={"70%"} height={400}>
                                <ComposedChart layout="vertical" width={500} height={400} data={activitiesDone}>
                                    <XAxis type="number" dataKey={"expected"} />
                                    <YAxis dataKey="gameName" type="category" />
                                    <Tooltip content={CustomTooltip2} />
                                    <Legend />
                                    <Bar dataKey="expected" barSize={20} fill={"#33c7a1"} />
                                    <Bar dataKey="done_by" barSize={20} fill={"#2e34a6"} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        : <h1 className="text-azul text-xl dark:text-azulsel">Você ainda não postou conteúdo</h1>
                    }
                </>
            }

            <SideBar type="" />
        </main>
    );
}