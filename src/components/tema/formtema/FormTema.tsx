import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, cadastrar, buscar } from "../../../services/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";
import type Tema from "../../../models/Tema";

function FormTema() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // -------------------- EFFECTS --------------------
    // Verifica se o usuário está logado
    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    // Busca tema por ID ao montar o componente
    useEffect(() => {
        if (id) buscarPorId(id);
    }, [id]);

    // -------------------- FUNÇÕES --------------------
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error: any) {
            if (error.toString().includes('401') || error.toString().includes('403')) handleLogout();
        }
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function retornar() {
        navigate('/temas');
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id) {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } else {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
            }
        } catch (error: any) {
            if (error.toString().includes('401') || error.toString().includes('403')) handleLogout();
            else ToastAlerta(`Erro ao ${id ? 'atualizar' : 'cadastrar'} o tema.`, 'erro');
        } finally {
            setIsLoading(false);
            retornar();
        }
    }

    // -------------------- JSX --------------------
    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id ? 'Editar Tema' : 'Cadastrar Tema'}
            </h1>

            <form className="w-full md:w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                {/* Descrição do Tema */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        required
                        value={tema.descricao}
                        onChange={atualizarEstado}
                        className="border-2 border-caramel rounded p-2"
                    />
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded text-milk bg-matcha hover:bg-caramel w-1/2 py-2 mx-auto flex justify-center transition disabled:bg-gray-400"
                >
                    {isLoading ? (
                        <ClipLoader color="#0f172a" size={22} />
                    ) : (
                        <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTema;
