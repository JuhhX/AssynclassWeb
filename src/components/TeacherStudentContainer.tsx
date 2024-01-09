import { MessageSquare, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation";

interface TeacherStudentContainerProps{
    nomeAluno: string,
    serieAluno: string,
    avatarURL: string,
    teacherID: string,
    studentID: string,
    addStudent?: boolean
}

export default function TeacherStudentContainer(props : TeacherStudentContainerProps){

    const router = useRouter();

    function createChat(){
        fetch("http://localhost:3333/createChat", {
            method: "POST",
            body: JSON.stringify({
                firstUser: props.studentID,
                secondUser: props.teacherID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        
        router.push("/chat")
    }
    
    function addStudent(){
        fetch("http://localhost:3333/teacher/add_student", {
            method: "PUT",
            body: JSON.stringify({
                studentID: props.studentID,
                teacherID: props.teacherID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(data => {
            if(data.status == 200){
                alert("Aluno adicionado com sucesso");
            }
            else{
                alert("Algo de errado aconteceu");
            }
        })
        
    }

    return (
        <div className="flex flex-row w-full p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.avatarURL} alt={`Avatar ${props.nomeAluno}`} className="w-1/4 h-10 rounded-lg" />
            <div className="w-1/2 h-full p-4">
                <h1 className="dark:text-azulsel">{props.nomeAluno}</h1>
                <p className="dark:text-azulsel">{props.serieAluno}</p>
            </div>
            {
                props.addStudent ? 
                    <button onClick={() => {addStudent()}}>
                        <UserPlus />
                    </button>
                :
                    <button onClick={() => {createChat()}}>
                        <MessageSquare />
                    </button>
            }
        </div>
    )
}