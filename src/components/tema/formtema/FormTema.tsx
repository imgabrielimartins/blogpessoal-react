import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { atualizar, cadastrar, buscar } from "../../../services/Services"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormTema() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }


    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id && token) {
            buscarPorId(id)
        }
    }, [id, token])


    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate('/temas')
    }


    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {

            if (id) {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                })

                ToastAlerta('Tema atualizado com sucesso!', 'sucesso')

            } else {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                })

                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso')
            }

        } catch (error: any) {

            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao salvar o tema.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            
            <h1 className="text-4xl text-center my-8">
                {id ? 'Editar Tema' : 'Cadastrar Tema'}
            </h1>

            <form
                className="w-full md:w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >
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

                <button
                    className="rounded text-milk bg-matcha hover:bg-caramel w-1/2 py-2 mx-auto flex justify-center transition disabled:bg-gray-400"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Carregando..."
                        : id
                            ? "Atualizar"
                            : "Cadastrar"}
                </button>
            </form>
        </div>
    )
}

export default FormTema
