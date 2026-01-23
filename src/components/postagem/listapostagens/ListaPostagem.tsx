import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagem/CardPostagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Services";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            buscarPostagens();
        }
    }, [token]);

    async function buscarPostagens() {
        try {
            setIsLoading(true);

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            });

        } catch (error: any) {

            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao buscar postagens!', 'erro');
            }

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col mx-2">

                {isLoading && (
                    <p className="text-center text-lg">Carregando...</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {postagens.map((postagem) => (
                        <CardPostagem 
                            key={postagem.id} 
                            postagem={postagem} 
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default ListaPostagens;
