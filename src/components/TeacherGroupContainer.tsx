import { BookUp } from "lucide-react";

interface TeacherGroupContainerProps{
    groupName: string,
    groupDescription: string,
    groupAvatar: string,
    groupID: number,
    openAtr: Function | undefined,
    containerType: number
}

export default function TeacherGroupContainer(props: TeacherGroupContainerProps){
    return (
        <div className="flex flex-row self-center w-3/4 p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.groupAvatar} alt={`Avatar ${props.groupName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1 className="text-lg font-semibold dark:text-azulsel">{props.groupName}</h1>
                <p>{props.groupDescription}</p>
            </div>
            {
                (props.containerType == 1) &&
                <button onClick={() => {(props.openAtr != undefined) ? props.openAtr(props.groupID) : null}}>
                    <BookUp />
                </button>
            }
        </div>
    )
}