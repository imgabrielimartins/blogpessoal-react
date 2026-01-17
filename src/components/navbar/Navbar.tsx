import { Link, useNavigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {

      const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }


    return (
        <>
        <nav className=" w-full flex justify-center py-4 bg-cream text-coffee">
        <div className="container flex items-center justify-center text-1g mx-8">
           <Link to="/home" className="text-2x1 font-bold">Blog Pessoal</Link>
        </div>
        <div className="container flex items-center justify-end gap-10 py-2 mr-9">
            <Link to="/">Postagens</Link>
            <Link to="/">Temas</Link>
            <Link to="/">Cadastrar tema</Link>
            <Link to="/">Perfil</Link>
            <Link to="" onClick={logout} className="'hover:underline">Sair</Link>
        </div>
        </nav>
        </>
    )
}

export default Navbar