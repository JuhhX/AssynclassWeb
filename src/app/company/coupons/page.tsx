import { SideBarCompany } from "@/components/SideBarCompany";

export default function Coupons(){
    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">
            
            <form className='flex flex-col w-3/4 self-center gap-4'>
                <label htmlFor="nome" className={`font-bold text-xl text-azul`}>Título: </label>
                <input type="text" name="nome" id="nome" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Título do cupom' />
                
                <label htmlFor="cnpj" className={`font-bold text-xl text-azul`}>Descrição: </label>
                <input type="text" name="cnpj" id="cnpj" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Descrição sobre o cupom' />
                
                <label htmlFor="email" className={`font-bold text-xl text-azul`}>Valor: </label>
                <input type="email" name="email" id="email" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Por quantos pontos os usuários devem trocar?' />

                <label htmlFor="password" className={`font-bold text-xl text-azul`}>Validade: </label>
                <input type="password" name="password" id="password" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Valido por quantos dias?' />
                
                <label htmlFor="password" className={`font-bold text-xl text-azul`}>Códigos: </label>
                <input type="password" name="password" id="password" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Código dos cupons' />
                
                <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar</button>
            </form>
            
            <SideBarCompany />
        </main>
    )
}