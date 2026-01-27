import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Services";
import CardTema from "../cardtema/CardTema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {


  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      buscarTemas();
    }
  }, [token]);


  async function buscarTemas() {
    try {
      setIsLoading(true);

      await buscar(
        "/temas",
        setTemas,
        { headers: { Authorization: token } }
      );

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#ffffff" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4 px-4">
        <div className="container flex flex-col mx-auto">

          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ListaTemas;
