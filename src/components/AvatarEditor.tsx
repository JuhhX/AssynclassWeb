import { useEffect, useState } from "react";

interface AvatarEditorProps{
    avatar: string | undefined,
    openEditor: Function,
    studentID: string | undefined
}

interface Characteristics{
    skin: string,
    eyebrows: string,
    eyes: string,
    glasses: string,
    mouth: string
}

export default function AvatarEditor(props: AvatarEditorProps){

    const [characteristics, setCharacteristics] = useState<Characteristics>(
        {
            skin: "ecad80",
            eyebrows: "variant01",
            eyes: "variant01",
            glasses: "-",
            mouth: "variant01"
        }
    );

    const [currentAvatar, setCurrentAvatar] = useState<string | undefined>("");
    const [eyebrows, setEyebrows] = useState<string[]>([]);
    const [eyes, setEyes] = useState<string[]>([]);
    const [glasses, setGlasses] = useState<string[]>([]);
    const [mouth, setMouth] = useState<string[]>([]);

    function saveAvatar(){

        if(props.studentID && currentAvatar){
            fetch(`http://localhost:3333/student/${props.studentID}/avatar`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    avatar: currentAvatar
                })
            });
        }

        alert("Avatar salvo com sucesso");
        window.location.reload();
    }

    useEffect(() => {
        setCurrentAvatar(props.avatar);

        setEyebrows(() => {
            let toAdd : string[] = [];

            for(let x = 1; x < 16; x++){
                toAdd.push(`variant${String(x).padStart(2, "0")}`);
            }

            return toAdd;
        })

        setEyes(() => {
            let toAdd : string[] = [];

            for(let x = 1; x < 27; x++){
                toAdd.push(`variant${String(x).padStart(2, "0")}`);
            }

            return toAdd;
        })

        setGlasses(() => {
            let toAdd : string[] = [];

            for(let x = 1; x < 6; x++){
                toAdd.push(`variant${String(x).padStart(2, "0")}`);
            }

            return toAdd;
        })

        setMouth(() => {
            let toAdd : string[] = [];

            for(let x = 1; x < 31; x++){
                toAdd.push(`variant${String(x).padStart(2, "0")}`);
            }

            return toAdd;
        })

    }, [])

    useEffect(() => {
        if(characteristics.glasses == "-")
            setCurrentAvatar(`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Bubba&backgroundColor=${characteristics.skin}&eyebrows=${characteristics.eyebrows}&eyes=${characteristics.eyes}&glasses=variant01&mouth=${characteristics.mouth}&glassesProbability=0`)
        else
            setCurrentAvatar(`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Bubba&backgroundColor=${characteristics.skin}&eyebrows=${characteristics.eyebrows}&eyes=${characteristics.eyes}&glasses=${characteristics.glasses}&mouth=${characteristics.mouth}&glassesProbability=100`)
    }, [characteristics]);

    return(
        <div className="w-full h-full top-0 left-0 bg-black/30 z-20 absolute flex flex-col justify-center items-center">
            
            <div className="w-4/5 h-[90%] bg-white p-8 rounded-xl relative">
                <p className="absolute right-8 top-4 text-azul text-6xl cursor-pointer" onClick={() => props.openEditor(false)}>x</p>
                <h1 className={`text-azul font-bold text-4xl mt-4`}>Editor de avatar</h1>

                <div className="flex flex-row w-full h-4/5 justify-between mt-10">
                    <img src={currentAvatar} alt="avatar" onClick={() => {}} className='w-96 h-96 rounded-lg self-center cursor-pointer' />

                    <div className="w-1/2 h-full flex flex-col overflow-auto items-center scrollbar-thin scrollbar-thumb-azulsel">

                        <div className="w-full p-4 flex flex-row gap-4 items-center justify-center">
                            <label className="text-azul text-xl font-bold mt-4" htmlFor="skin">Cor da pele: </label>
                            <input type="color" name="skin" id="skin" value={"#" + characteristics.skin} className="h-full" onChange={(text) => {setCharacteristics({...characteristics, skin: text.currentTarget.value.replace("#", "")})}} />
                        </div>

                        <label className="text-azul text-xl font-bold mt-4" htmlFor="eyebrows">Sobrancelhas: </label>
                        <select className="text-lg p-4 w-4/5 mt-4 rounded-lg border-2 border-b-4 border-azul" name="eyebrows" id="eyebrows" value={characteristics.eyebrows} onChange={(text) => {setCharacteristics({...characteristics, eyebrows: text.currentTarget.value})}} >
                            {
                                eyebrows.map((o, i) => {
                                    return <option key={o} value={o}>{`Variante ${String(i+1).padStart(2, "0")}`}</option>
                                })
                            }
                        </select>

                        <label className="text-azul text-xl font-bold mt-4" htmlFor="eyes">Olhos: </label>
                        <select className="text-lg p-4 w-4/5 mt-4 rounded-lg border-2 border-b-4 border-azul" name="eyes" id="eyes" value={characteristics.eyes} onChange={(text) => {setCharacteristics({...characteristics, eyes: text.currentTarget.value})}}>
                            {
                                eyes.map((o, i) => {
                                    return <option key={o} value={o}>{`Variante ${String(i+1).padStart(2, "0")}`}</option>
                                })
                            }
                        </select>

                        <label className="text-azul text-xl font-bold mt-4" htmlFor="glasses">Óculos: </label>
                        <select className="text-lg p-4 w-4/5 mt-4 rounded-lg border-2 border-b-4 border-azul" name="glasses" id="glasses" value={characteristics.glasses} onChange={(text) => {setCharacteristics({...characteristics, glasses: text.currentTarget.value})}}>
                            <option key={"-"} value={"-"}>{`Sem óculos`}</option>
                            {
                                glasses.map((o, i) => {
                                    return <option key={o} value={o}>{`Variante ${String(i+1).padStart(2, "0")}`}</option>
                                })
                            }
                        </select>

                        <label className="text-azul text-xl font-bold mt-4" htmlFor="mouth">Boca: </label>
                        <select className="text-lg p-4 w-4/5 mt-4 rounded-lg border-2 border-b-4 border-azul" name="mouth" id="mouth" value={characteristics.mouth} onChange={(text) => {setCharacteristics({...characteristics, mouth: text.currentTarget.value})}}>
                            {
                                mouth.map((o, i) => {
                                    return <option key={o} value={o}>{`Variante ${String(i+1).padStart(2, "0")}`}</option>
                                })
                            }
                        </select>
                        <button className="bg-verde cursor-pointer p-4 rounded-xl text-2xl text-white font-bold mt-4 transition-colors hover:bg-verdesel" onClick={() => saveAvatar()}>Salvar</button>

                    </div>

                </div>
            </div>

        </div>
    )
}