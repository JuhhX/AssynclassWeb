
interface AtrContentProps{
    idContent: string,
    contentName: string,
    contentDescription: string,
    assign: Function,
    contentType: number
}

export default function AtrContent(props: AtrContentProps){
    return (
        <div className="w-full p-4 rounded-xl bg-cinza flex flex-row">
            <div className="w-3/4">
                <h1 className="text-azul text-xl">{props.contentName}</h1>
                <p className="text-verde text-lg">{props.contentDescription}</p>
            </div>
            <div className="w-1/4 flex flex-col justify-center">
                <button type="submit" className='bg-verde rounded-lg p-2 px-4 text-white font-bold text-xl self-center w-fit transition-colors hover:bg-verdesel' onClick={() => props.assign(props.idContent+"", props.contentType)}>Atribuir</button>
            </div>
        </div>
    )
}