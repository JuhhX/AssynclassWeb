import Image, { StaticImageData } from "next/image";

interface PlansContainerProps{
    image: StaticImageData,
    title: string,
    access: string,
    cupons: string,
    visibility: string,
    value: string,
    hueRotate?: boolean
}

export default function PlansContainer(props: PlansContainerProps){
    return (
        <div className="flex flex-col bg-slate-200 w-1/4 p-6 py-8 rounded-xl">
            <Image src={props.image} alt="" className={`rounded-xl ${(props.hueRotate) ? "hue-rotate-90" : ""}`} />
            <p className="text-2xl font-bold text-center text-azul dark:text-azulsel mt-4">{props.title}</p>
            <ul className="text-center text-lg mt-4 mb-4">
                <li>{props.access}</li>
                <li>{props.cupons}</li>
                <li>{props.visibility}</li>
            </ul>
            <p className="text-2xl font-bold text-center text-azul dark:text-azulsel mt-4">{props.value}</p>
            <button className="bg-azul p-2 px-5 mt-4 w-1/2 self-center text-white rounded-xl transition-colors duration-500 hover:bg-verde dark:bg-azulsel">Selecionar plano</button>
        </div>
    );
}