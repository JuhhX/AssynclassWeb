'use client'

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { ResponsiveContainer, Bar, Legend, Tooltip, XAxis, YAxis, BarChart } from "recharts";

interface TeacherActivity {
    teacherID: string,
    teacherName: string,
    NumberOfContents: number
};

interface GroupsPercentage{
    teacherName: string,
    teacherID: string,
    percentage: number
}

export default function InstitutionCharts(){

    const [teachersActivity, setTeacherActivity] = useState<TeacherActivity[]>([]);
    const [groupTeachersPercentage, setGroupTeachersPercentage] = useState<GroupsPercentage[]>([]);
    const chartsLoaded = useRef({
        chart1: false,
        chart2: false
    })

    useEffect(() => {
        getUserName().then(resp => {
            fetch(`http://localhost:3333/instituition/${resp.id}/teachers_charts`)
            .then(json => json.json())
            .then(data => {
                setTeacherActivity(data);
                chartsLoaded.current.chart1 = true;
            })

            fetch(`http://localhost:3333/instituition/${resp.id}/groups_teachers`)
            .then(json => json.json())
            .then(data => {
                setGroupTeachersPercentage(data);
                chartsLoaded.current.chart2 = true;
            })
        })
    }, [])

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">

            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Professores mais ativos: </h1>

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
                    (teachersActivity.length > 0) ?
                        <ResponsiveContainer width={"70%"} height={400}>
                            <BarChart data={teachersActivity}>
                                <XAxis dataKey={"teacherName"} />
                                <YAxis dataKey={"NumberOfContents"} />
                                <Tooltip wrapperStyle={{backgroundColor: "rgba(0.5 0.5 0.5 0.2)"}} />
                                <Legend />
                                <Bar dataKey={"NumberOfContents"} fill="#2e34a6" width={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    : null
            }

            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Desempenho dos grupos por professor: </h1>

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
                    (groupTeachersPercentage.length > 0) ?
                        <ResponsiveContainer width={"70%"} height={400}>
                            <BarChart data={groupTeachersPercentage}>
                                <XAxis dataKey={"teacherName"} />
                                <YAxis dataKey={"percentage"} domain={[0, 100]} />
                                <Tooltip wrapperStyle={{backgroundColor: "rgba(0.5 0.5 0.5 0.2)"}} />
                                <Legend />
                                <Bar dataKey={"percentage"} fill="#2e34a6" width={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    : null
            }

            <SideBar type="institution" />
        </main>
    );
}