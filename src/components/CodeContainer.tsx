
interface CodeContainerProps{
    codeLines: string[]
}

export default function CodeContainer(props: CodeContainerProps){
    return(
        <pre className="mt-4 h-fit bg-slate-300 p-4 rounded-xl whitespace-pre flex flex-col">
            {
                props.codeLines.map((line, index) => {
                    return <code key={index}>{line}</code>;
                })
            }
        </pre>
    );
}