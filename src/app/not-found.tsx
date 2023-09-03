import Image from 'next/image'
import logo from '../assest/logo.png'

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-row justify-center box-border overflow-auto">

        <div className="h-[135%] w-1/2 bg-azul border-r-24 border-verde block absolute rotate-[35deg] -left-1/4 -top-1/2" />

        <Image src={logo} alt='Assynclass logo' width={175} height={175} className='z-10 w-[175px] h-[175px] absolute top-1/2 -translate-y-3/4 left-10' />

        <div className={`flex flex-col h-full w-1/2 p-8 gap-8 justify-center overflow-hidden`}>
            <h1 className='self-center text-4xl text-center font-semibold text-azul'>ERRO 404 - PARECE QUE ESSA PÁGINA NÃO EXISTE</h1>
            <a href="/student/home" className='cursor-pointer text-verde font-semibold text-2xl text-center self-center'>Clique para voltar a tela inicial</a>
        </div>
    </main>
  )
}