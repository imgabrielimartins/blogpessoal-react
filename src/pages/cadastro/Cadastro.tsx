import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";
import { ClipLoader } from "react-spinners";
import cadastro from "../../assets/img/cadastro.png"

function Cadastro() {

   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  function retornar() {
    navigate("/");
  }

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });   
  }


    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
      setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
     e.preventDefault()

     if(confirmarSenha === usuario.senha && usuario.senha.length >=8){
        
          setIsLoading(true)

          try{
            await cadastrarUsuario(`usuarios/cadastrar`, usuario, setUsuario)
            alert('Usuario cadastrado com sucesso!')
          }catch(error){
             alert('Erro ao cadastrar usuario')
          }
         }else{
        alert('As senhas não conferem')
        setUsuario({...usuario, senha: ''})
        setConfirmarSenha('')

     }
     setIsLoading(false)
   }

  return (
  <>
  <div className='grid grid-cols-1 lg:grid-cols-2 h-screen font-bold gap-8'>
    <div style={{ backgroundImage: `url${cadastro}` }}
    className='hidden lg:block bg-no-repeat bg-cover bg-center h-full'
    ></div>
    <form className="flex flex-col w-2/3 gap-3 t-24 justify-center "
        onSubmit={cadastrarNovoUsuario}>
        <h2 className="text-coffee text-5xl">Cadastrar</h2>
        <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input 
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className=" border-2 border-coffee rounded p-2"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
             value={usuario.senha}
             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
        </div>
        <div className="flex justify-around w-full gap-8">
            <button
            type="reset"
            className="rounded text-coffee bg-cream hover:bg-matcha w-1/2 py-2"
            onClick={retornar}
            > 
            Cancelar
            </button>
            <button 
            type="submit"
            className="rounded text-coffee bg-matcha hover:bg-cream w-1/2 py-2 flex justify-center"
            >
                { isLoading ?
                <ClipLoader
                color="#ffffff"
                size={24}
                /> :
              <span>Cadastrar</span> 
              }
            </button>
        </div>
      </form>
    </div>
  </>
);
}

export default Cadastro
