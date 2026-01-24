import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { ClipLoader } from "react-spinners";
import cadastroIMG from '../../assets/img/cadastroimg.png'

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

     useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function logar(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("Dados enviados para login:", usuarioLogin);
  handleLogin(usuarioLogin);
}


    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold'>

            <form
                className='flex justify-center items-center flex-col w-1/2 gap-4'
                onSubmit={logar}
            >

                <h2 className='text-coffee text-5xl'>
                    Entrar
                </h2>

                <div className='flex flex-col w-full'>
                    <label htmlFor='usuario'>Usuário</label>
                    <input
                        type='text'
                        id='usuario'
                        name='usuario'
                        placeholder='Usuário'
                        className='border-2 border-coffee rounded p-2'
                        value={usuarioLogin.usuario || ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor='senha'>Senha</label>
                    <input
                        type='password'
                        id='senha'
                        name='senha'
                        placeholder='Senha'
                        className='border-2 border-coffee rounded p-2'
                        value={usuarioLogin.senha || ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <button
                    type='submit'
                    className='rounded bg-cream flex justify-center hover:bg-matcha text-coffee w-1/2 py-2'
                >
                    {
                        isLoading ? (
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />
                        ) : (
                            <span>Entrar</span>
                        )
                    }
                </button>

                <hr className='border-coffee w-full' />

                <p>
                    Ainda não tem conta?{' '}
                    <Link to="/cadastro" className='text-coffee hover:underline'>
                        Cadastre-se
                    </Link>
                </p>

            </form>

            <div
                style={{ backgroundImage: `url(${cadastroIMG})` }}
                className='lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center'
            >
            </div>

        </div>
    );
}

export default Login;
