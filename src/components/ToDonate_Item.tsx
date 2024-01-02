
interface Donation_Item_props{
    id: string
    item_name: string,
    description: string
}


export default function ToDonate_Item(props: Donation_Item_props){
    return(
        <div className="w-full p-4 rounded-lg flex flex-row border-2 border-b-4 bg-transparent border-verde mt-4">
            <div className="w-4/5 h-full flex flex-col gap-3">
                <p className="text-verde text-xl font-bold dark:text-verdesel">{props.item_name}</p>
                <p className="text-verde text-lg dark:text-verdesel">{props.description}</p>
            </div>
            <div className="w-1/5 h-full flex flex-row p-4 gap-5">
                <div className="bg-verde cursor-pointer p-2 rounded-lg text-white hover:bg-verdesel" onClick={() => {}}>DOAR</div>
            </div>
        </div>
    );
}