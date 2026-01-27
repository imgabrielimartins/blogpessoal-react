import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarPorId(id: string) {
    try {
      setIsLoading(true);

      await buscar(
        `/temas/${id}`,
        setTema,
        {
          headers: { Authorization: token },
        }
      );

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deletarTema() {
    try {
      setIsLoading(true);

      await deletar(
        `/temas/${id}`,
        {
          headers: { Authorization: token },
        }
      );

      ToastAlerta("Tema apagado com sucesso!", "sucesso");
      retornar();

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar o tema!", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/temas");
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined && token !== "") {
      buscarPorId(id);
    }
  }, [id, token]);


  return (
    <div className="container w-full md:w-1/3 mx-auto">

      <h1 className="text-4xl text-center my-4">
        Deletar Tema
      </h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">

        <header className="py-2 px-6 bg-caramel text-milk font-bold text-2xl">
          Tema
        </header>

        <p className="p-8 text-2xl bg-milk h-full text-center">
          {tema.descricao}
        </p>

        <div className="flex">

          <button
            className="text-coffee bg-cream hover:bg-matcha w-full py-2 transition"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>

          <button
            className="w-full text-milk bg-caramel hover:bg-matcha flex items-center justify-center transition"
            onClick={deletarTema}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
