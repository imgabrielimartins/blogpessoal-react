function Navbar() {
    return (
        <>
        <nav className=" w-full flex justify-center py-4 bg-cream text-caramel">
        <div className="container flex items-center justify-center text-1g mx-8">
            <h2>Blog Pessoal</h2>
        </div>
        <div className="container flex items-center justify-end gap-10 py-2 mr-9">
            <button>Postagens</button>
            <button>Temas</button>
            <button>Cadastrar Tema</button>
            <button>Perfil</button>
            <button>Sair</button>
        </div>
        </nav>
        </>
    )
}

export default Navbar