import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        }
    }

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
        if (id !== undefined) buscarPostagemPorId(id);
    }, [id]);

    useEffect(() => {
        setPostagem(prev => ({ ...prev, tema }));
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            tema,
            usuario,
        }));
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id) {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                ToastAlerta('Postagem atualizada com sucesso', 'sucesso');
            } else {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
            }
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
            else ToastAlerta(`Erro ao ${id ? 'atualizar' : 'cadastrar'} a postagem`, 'erro');
        } finally {
            setIsLoading(false);
            retornar();
        }
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-full md:w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                
            
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Título"
                        name="titulo"
                        required
                        className="border-2 border-coffee rounded p-2"
                        value={postagem.titulo}
                        onChange={atualizarEstado}
                    />
                </div>

            
                <div className="flex flex-col gap-2">
                    <label htmlFor="texto">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-coffee rounded p-2"
                        value={postagem.texto}
                        onChange={atualizarEstado}
                    />
                </div>

                
                <div className="flex flex-col gap-2">
                    <p>Tema da Postagem</p>
                    <select
                        name="tema"
                        value={tema.id}
                        className="border p-2 border-coffee rounded"
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value={0} disabled>
                            Selecione um Tema
                        </option>
                        {temas.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={carregandoTema || isLoading}
                    className="rounded disabled:bg-milk bg-caramel hover:bg-matcha text-milk font-bold w-1/2 mx-auto py-2 flex justify-center transition"
                >
                    {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>{id ? 'Atualizar' : 'Cadastrar'}</span>}
                </button>

            </form>
        </div>
    );
}

export default FormPostagem;
