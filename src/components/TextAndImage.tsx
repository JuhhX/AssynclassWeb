import Image, { StaticImageData } from "next/image";

interface TextAndImageProps{
    textDirection: string,
    title: string,
    text: string,
    buttonText: string,
    buttonAction: Function
    image: StaticImageData
}

export default function TextAndImage(props: TextAndImageProps){

    const TextContainer = () => (
        <div className="w-1/2 h-full flex flex-col gap-6 p-6 text-azul dark:text-azulsel">
            <h1 className="text-4xl font-bold text-center">{props.title}</h1>
            <p className="text-2xl text-center whitespace-pre-wrap">{props.text}</p>
            <button onClick={() => (props.buttonAction) ? props.buttonAction() : {}} className="text-white bg-azul p-4 rounded-xl text-xl w-1/2 self-center dark:bg-azulsel">{props.buttonText}</button>
        </div>
    );

    const ImageContainer = () => (
        <Image src={props.image} alt="Imagem de demonstração do sistema de gamificação" className="w-1/2" />
    );

    return (
        <div className="flex flex-row h-96 p-10">
            {
                (props.textDirection == "right") ?
                    <>
                        <ImageContainer />
                        <TextContainer />
                    </>
                : (props.textDirection == "left") ?
                    <>
                        <TextContainer />
                        <ImageContainer />
                    </>
                : null

            }
        </div>
    );
}