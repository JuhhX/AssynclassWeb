import { getUserName } from "@/lib/user/user";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface StudentTeacherContainerProps{
    teacherID: string,
    teacherName: string,
    subject: string,
    avatarURL: string,
}

export default function StudentMentorContainer(props: StudentTeacherContainerProps){

    const [requestSended, setRequestSended] = useState<boolean>(false);

    useEffect(() => {

        getUserName().then(resp => {

            if(requestSended){
                fetch("http://localhost:3333/sendRequest", {
                    method: "POST",
                    body: JSON.stringify({
                        teacherID: props.teacherID,
                        studentID: resp.id
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            }
            else{
                fetch("http://localhost:3333/removeRequest", {
                    method: "DELETE",
                    body: JSON.stringify({
                        teacherID: props.teacherID,
                        studentID: resp.id
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            }

        });


    }, [requestSended])

    return (
        <div className="flex flex-row w-full p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.avatarURL} alt={`Avatar ${props.teacherName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1>{props.teacherName}</h1>
                <p>{props.subject}</p>
            </div>
            {
                (requestSended) ?
                <>
                    <p className="text-verde">Solicitação enviada</p>
                    <button onClick={() => setRequestSended(false)} className="text-vermelho">Cancelar solicitação</button>
                </>
                : <button onClick={() => setRequestSended(true)}>
                    <Check />
                </button>
            }
        </div>
    )
}