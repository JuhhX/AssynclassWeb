
export default function HomeHeader(){
    return (
        <header className="text-azul flex flex-row h-20 text-xl border-b-4 border-azul rounded-b-lg dark:border-azulsel">
        <div className="w-1/4 p-3 flex flex-row justify-center items-center">
          <p className="font-bold text-3xl dark:text-azulsel">Assynclass</p>
        </div>

        <div className="w-1/2 p-3 flex flex-row justify-end items-center gap-6">
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Novidades</button>
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Docs</button>
          <a href="/home/to_companies" className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Para empresas</a>
          <button className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Sobre nós</button>
        </div>
        
        <div className="w-1/4 p-3 flex flex-row justify-end items-center gap-6 pr-5">
          <a href="/register/school" className="transition-colors duration-500 dark:text-azulsel hover:text-verde">Cadastro</a>
          <a href="/login" className="bg-azul p-2 px-5 text-white rounded-xl transition-colors duration-500 hover:bg-verde dark:bg-azulsel">Login</a>
        </div>
      </header>
    );
}