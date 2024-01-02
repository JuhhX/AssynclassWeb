import { ItemList } from "@/app/instituition/donations_list/page";
import { Check, Minus, Pen } from "lucide-react"
import { useState } from "react";

interface Donation_Item_props{
    id: string
    item_name: string,
    description: string,
    deleteItem: Function
    changeItem: Function
}

export default function Donation_Item(props: Donation_Item_props){

    const [editMode, setEditMode] = useState<boolean>(false);

    function changeItemName(name: string){
        props.changeItem((prev: ItemList[]) => {
            return prev.map(i => {
                if(i.item_id == props.id)
                    return {...i, item: name}
                return i;
            })
        })
    }

    function changeItemDescription(description: string){
        props.changeItem((prev: ItemList[]) => {
            return prev.map(i => {
                if(i.item_id == props.id)
                    return {...i, description}
                return i;
            })
        })
    }

    return (
        <div className="w-[70%] p-4 rounded-lg flex flex-row border-2 border-b-4 bg-transparent border-azul mt-4">
            <div className="w-4/5 h-full flex flex-col gap-3">
                {
                    !editMode ?
                        <>
                            <p className="text-azul text-xl font-bold dark:text-azulsel">{props.item_name}</p>
                            <p className="text-azul text-lg dark:text-azulsel">{props.description}</p>
                        </>
                    : 
                        <>
                            <input type="text" name="item" id="item" value={props.item_name} onChange={(e) => {changeItemName(e.currentTarget.value)}} className='w-full text-xl border-2 border-verde rounded-lg p-2 text-verde font-fredoka400 dark:shadow-neon-verde placeholder:text-verde/75 focus:ring-0' placeholder='Item que precisa' />
                            <input type="text" name="description" id="description" value={(props.description) ? props.description : ""} onChange={(e) => {changeItemDescription(e.currentTarget.value)}} className='w-full text-xl border-2 border-verde rounded-lg p-2 text-verde font-fredoka400 dark:shadow-neon-verde placeholder:text-verde/75 focus:ring-0' placeholder='Descrição (Opcional)' />
                        </>
                }
            </div>
            <div className="w-1/5 h-full flex flex-row p-4 gap-5">
                <div className="bg-azul cursor-pointer p-2 rounded-lg text-white hover:bg-azulsel" onClick={() => setEditMode(!editMode)}>{editMode ? <Check /> : <Pen />}</div>
                <div className="bg-azul cursor-pointer p-2 rounded-lg text-white hover:bg-azulsel" onClick={() => props.deleteItem(props.id)}><Minus /></div>
            </div>
        </div>
    )
}