import cadastro from "../../assets/img/cadastro.png"

function Cadastro() {
  return (
  <>
  <div className='grid grid-cols-1 lg:grid-cols-2 h-screen font-bold gap-8'>
    <div style={{ backgroundImage: `url(${cadastro})` }}
    className='hidden lg:block bg-no-repeat bg-cover bg-center h-full'
    ></div>
    <form className="flex flex-col w-2/3 gap-3 t-24 justify-center ">
        <h2 className="text-coffee text-5xl">Cadastrar</h2>
        <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input 
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className=" border-2 border-coffee rounded p-2"
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input 
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className=" border-2 border-coffee rounded p-2"
            />
        </div>
        <div className="flex  flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input 
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-coffee rounded p-2"
            />
        </div>
        <div className="flex  flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input 
             type="password"
             id="senha"
             name="senha"
             placeholder="Senha"
             className="border-2 border-coffee rounded p-2"
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            className="border-2 border-coffee rounded p-2"
            />
        </div>
        <div className="flex justify-around w-full gap-8">
            <button
            type="reset"
            className="rounded text-coffee bg-cream hover:bg-matcha w-1/2 py-2"
            > 
            Cancelar
            </button>
            <button 
            type="submit"
            className="rounded text-coffee bg-matcha hover:bg-cream w-1/2 py-2 flex justify-center"
            >
                Cadastrar
            </button>
        </div>
      </form>
    </div>
  </>
)
}

export default Cadastro