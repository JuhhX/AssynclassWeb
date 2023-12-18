import { SideBarCompany } from "@/components/SideBarCompany";

export default function CompanyHome(){

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">
            <SideBarCompany />
        </main>
    )

}