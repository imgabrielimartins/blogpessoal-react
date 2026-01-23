import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
       ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
       navigate('/')
    }

    let component: ReactNode

    if(usuario.token !== '') {
        component = ( 

<nav className="w-full flex justify-center py-4 bg-cream text-coffee">
            <div className="container flex items-center justify-between mx-8">

                <Link to="/home" className="text-2xl font-bold">
                    Blog Pessoal
                </Link>

               
                <div className="flex items-center gap-3">
                    {usuario.foto && (
                        <img 
                            src={usuario.foto} 
                            alt="Foto do usuário" 
                            className="w-14 h-14 rounded-full"
                        />
                    )}
                    
                    <div>
                        <p>Bem-vindo!</p>
                        <p className="font-semibold">{usuario.nome}</p>
                    </div>
                </div>

                <div className="flex gap-6 text-lg">
                    <Link to="/postagens" className="hover:underline">
                        Postagens
                    </Link>

                    <Link to="/temas" className="hover:underline">
                        Temas
                    </Link>

                    <Link to="/cadastrartema" className="hover:underline">
                        Cadastrar Tema
                    </Link>

                    <Link to='/perfil' className='hover:underline'>Perfil</Link>

                    <button 
                        onClick={logout} 
                        className="hover:underline"
                    >
                        Sair
                    </button>
                </div>

            </div>
        </nav>
        )
    }

    return (
        <>
        {component}
        </>
    );
}

export default Navbar;
