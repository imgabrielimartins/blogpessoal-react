import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";
import { ClipLoader } from "react-spinners";
import cadastroIMG from "../../assets/img/cadastroimg.png";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });

    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

  
    function retornar() {
        navigate("/");
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
            ToastAlerta(
                "Dados inconsistentes! Senha deve ter ao menos 8 caracteres e ser igual à confirmação.",
                "erro"
            );
            setUsuario({ ...usuario, senha: "" });
            setConfirmarSenha("");
            return;
        }

        setIsLoading(true);

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
            ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
        } catch (error) {
            ToastAlerta("Erro ao cadastrar o usuário!", "erro");
        } finally {
            setIsLoading(false);
        }
    }

  
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen font-bold gap-8">
            
          
            <div
                style={{ backgroundImage: `url(${cadastroIMG})` }}
                className="hidden lg:block bg-no-repeat bg-cover bg-center h-full"
            />

        
            <form
                className="flex flex-col w-2/3 gap-3 justify-center mx-auto my-8"
                onSubmit={cadastrarNovoUsuario}
            >
                <h2 className="text-coffee text-5xl text-center">Cadastrar</h2>

       
                <div className="flex flex-col w-full">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        className="border-2 border-coffee rounded p-2"
                        value={usuario.nome}
                        onChange={atualizarEstado}
                    />
                </div>

        
                <div className="flex flex-col w-full">
                    <label htmlFor="usuario">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuário"
                        className="border-2 border-coffee rounded p-2"
                        value={usuario.usuario}
                        onChange={atualizarEstado}
                    />
                </div>

        
                <div className="flex flex-col w-full">
                    <label htmlFor="foto">Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="URL da foto"
                        className="border-2 border-coffee rounded p-2"
                        value={usuario.foto}
                        onChange={atualizarEstado}
                    />
                </div>

               
                <div className="flex flex-col w-full">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        className="border-2 border-coffee rounded p-2"
                        value={usuario.senha}
                        onChange={atualizarEstado}
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
                        onChange={handleConfirmarSenha}
                    />
                </div>

           
                <div className="flex justify-around w-full gap-8 mt-4">
                    <button
                        type="button"
                        className="rounded text-coffee bg-cream hover:bg-matcha w-1/2 py-2"
                        onClick={retornar}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded text-coffee bg-matcha hover:bg-cream w-1/2 py-2 flex justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>Cadastrar</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;
