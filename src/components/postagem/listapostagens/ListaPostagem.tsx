import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagem/CardPostagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Services";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";

function ListaPostagens() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postagens, setPostagens] = useState<Postagem[]>([]);

  
    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);


    useEffect(() => {
        if (token) buscarPostagens();
    }, [token]);

    async function buscarPostagens() {
        try {
            setIsLoading(true);
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="container mx-auto my-4 flex flex-col items-center">


            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#14b8a6" size={32} />
                </div>
            )}

            {!isLoading && postagens.length === 0 && (
                <span className="text-3xl text-center my-8">
                    Nenhuma postagem foi encontrada!
                </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {postagens.map(postagem => (
                    <CardPostagem key={postagem.id} postagem={postagem} />
                ))}
            </div>
        </div>
    );
}

export default ListaPostagens;
