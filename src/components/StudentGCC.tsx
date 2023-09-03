interface StudentGroupCreateContainerProps{
    studentName: string | undefined,
    serieStudent: string | undefined,
    avatarURL: string | undefined
}

export default function StudentGroupCreateContainer(props: StudentGroupCreateContainerProps){
    return(
        <div className="flex flex-row w-3/4 self-center p-4 gap-8 items-center text-azul border-b-2 border-azul">
            <img src={props.avatarURL} alt={`Avatar ${props.studentName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1>{props.studentName}</h1>
                <p>{props.serieStudent}</p>
            </div>
        </div>
    )
}