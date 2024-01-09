import { FormEvent, useEffect, useRef, useState } from "react";

interface customPlanEditorProps{
    openEditor: Function
    company: Company | null
}

export default function CustomPlanEditor(props: customPlanEditorProps){

    const [days, setDays] = useState<number>(7);
    const [cupons, setCupons] = useState<number>(10);
    const [value, setValue] = useState<number>(0);
    const [checked, setChecked] = useState<boolean>(false);

    function addPlan(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        if(days >= 7 && cupons >= 10 && props.company){
            fetch(`http://localhost:3333/company/${props.company.companyID}/custom_plan`, {
                method: "PUT",
                body: JSON.stringify({
                    cuponsAvailable: Number(data.get("cupons")),
                    days: Number(data.get("days")),
                    visibility: Boolean(data.get("visibility")),
                    planValue: value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(res => {
                if(res.status == 200){
                    alert("Plano cadastrado com sucesso");
                    window.location.reload();
                }
                else{
                    alert("UM ERRO OCORREU!");
                }
            })
        }
        else
            alert("A quantidade de dias deve ser maior do que 7 e de cupons maior igual a 10");

    }

    useEffect(() => {
        
        let d = days;
        let c = cupons;

        if(c < 10)
            c = 10;
        if(d < 7)
            d = 7;

        if(c >= 10 && d >= 7)
            setValue((d*0.4) + (c * 0.36) + ((checked) ? 52 : 0));
    }, [days, cupons, checked]);

    return (
        <div className="w-full h-full top-0 left-0 bg-black/30 z-20 absolute flex flex-col justify-center items-center">
            <div className="w-4/5 h-[90%] bg-white p-8 rounded-xl relative">
                <p className="absolute right-8 top-4 text-azul text-6xl cursor-pointer" onClick={() => props.openEditor(false)}>x</p>
                <h1 className={`text-azul font-bold text-4xl mt-4`}>Plano customizado</h1>

                <form onSubmit={(e) => {addPlan(e)}} className='flex flex-col w-3/4 self-center gap-4'>
                    <label htmlFor="days" className={`font-bold text-xl text-azul`}>Por quantos dias você quer um plano? </label>
                    <input type="number" name="days" id="days" value={days} onChange={(e) => {setDays(Number(e.currentTarget.value))}} className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira os dias (Ex. 30)' />
                    
                    <label htmlFor="cupons" className={`font-bold text-xl text-azul`}>Quantos cupons? </label>
                    <input type="number" name="cupons" id="cupons" value={cupons} onChange={(e) => {setCupons(Number(e.currentTarget.value))}} className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira a quantidade de cupons que deseja (Ex. 30)' />
                    
                    <div className="flex flex-row gap-4">
                        <label htmlFor="visibility" className={`font-bold text-xl text-azul`}>Visibilidade extra? </label>
                        <input type="checkbox" name="visibility" id="visibility" onChange={(e) => {setChecked(e.currentTarget.checked)}} className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Descrição sobre o cupom' />
                    </div>

                    <h1 className={`text-verde font-bold text-4xl mt-4`}>{`Valor: R$${value.toFixed(2)}`}</h1>
                    
                    <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar plano</button>
                </form>
            </div>
        </div>
    );
}