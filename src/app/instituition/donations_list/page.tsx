'use client'
import Donation_Item from "@/components/Donation_Item";
import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export interface ItemList{
    item_id: string
    item: string
    description: string
}

export default function Donations_list(){

    const [itemList, setItemList] = useState<ItemList[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            fetch(`http://localhost:3333/institution/${res.id}/list`)
            .then(res => res.json())
            .then(data => {
                setItemList(data);
                setLoaded(true);
            })
        })
    }, []);

    function addItemInList(){
        if(inputValue != ""){
            setItemList([...itemList, {item_id: String(Math.random()), item: inputValue, description: ""}]);
            setInputValue("");
        }
    }

    function removeItemFromList(id: string){
        setItemList((prev) => (prev.filter(i => i.item_id != id)));
    }

    function save(){

        getUserName().then(res => {
            fetch('http://localhost:3333/instituition/list', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(
                    {
                        institutionID: res.id,
                        itens_list: itemList
                    }
                )
            })
        })

    }

    return (
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Lista para doações</h1>

            <div className="flex flex-row gap-5">
                <input type="text" name="item" id="item" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} className='w-1/2 text-xl border-2 border-verde rounded-lg p-2 text-verde font-fredoka400 dark:shadow-neon-verde placeholder:text-verde/75 focus:ring-0' placeholder='Item que a instituição precisa' />
                <button onClick={addItemInList} className='bg-verde self-center rounded-xl p-2 px-4 text-white font-semibold text-xl transition-colors hover:bg-verdesel'>Adicionar</button>
                <button onClick={save} className='bg-verde self-center rounded-xl p-2 px-4 text-white font-semibold text-xl transition-colors hover:bg-verdesel'>Salvar</button>
            </div>

            <div className="overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-azulsel">
                {
                    !isLoaded ? 
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                            wrapperClass="blocks-wrapper"
                            colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                        />
                    :
                        (itemList.length > 0) ? 
                            itemList.map((i) => {
                                return <Donation_Item key={i.item_id} id={i.item_id} item_name={i.item} description={i.description} deleteItem={removeItemFromList} changeItem={setItemList} />
                            })
                        : <h1 className="text-azul text-xl dark:text-azulsel">{"VOCÊ AINDA NÃO ADICIONOU UM ITEM ..."}</h1>
                    
                }
            </div>

            <SideBar type={'instituition'} />
        </main>
    );
}