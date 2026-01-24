import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CardTema from "../cardtema/CardTema";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Services";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [temas, setTemas] = useState<Tema[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

   
    useEffect(() => {
        if (token) buscarTemas();
    }, [token]);

 
    async function buscarTemas() {
        try {
            setIsLoading(true);
            await buscar('/temas', setTemas, {
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
                    <SyncLoader color="#ffffff" size={32} />
                </div>
            )}

          
            {!isLoading && temas.length === 0 && (
                <span className="text-3xl text-center my-8">
                    Nenhum tema foi encontrado!
                </span>
            )}

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {temas.map(tema => (
                    <CardTema key={tema.id} tema={tema} />
                ))}
            </div>
        </div>
    );
}

export default ListaTemas;
