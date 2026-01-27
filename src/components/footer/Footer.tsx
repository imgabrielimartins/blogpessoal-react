import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer () {
    
    const data = new Date().getFullYear();
    const { usuario } = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <footer className="flex justify-center bg-matcha text-coffee mt-0 ">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">
                        Blog Pessoal Gabrieli Martins | Copyright: {data}
                    </p>

                    <p className="text-lg"> 
                        Acesse minhas redes sociais
                    </p>

                    <div className="flex gap-4 mt-2">
                        <a 
                            href="https://www.linkedin.com/in/gabrielimartinsdev/" 
                            target="_blank"
                            rel="noopener noreferrer"
                        > 
                            <LinkedinLogoIcon size={40} weight="bold" />
                        </a>

                        <a 
                            href="https://www.instagram.com/imgabrielimartins/" 
                            target="_blank"
                            rel="noopener noreferrer"
                        > 
                            <InstagramLogoIcon size={40} weight="bold" />
                        </a>

                        <a 
                            href="https://github.com/imgabrielimartins" 
                            target="_blank"
                            rel="noopener noreferrer"
                        > 
                            <GithubLogoIcon size={40} weight="bold" />
                        </a>
                    </div>
                </div>
            </footer>
        )
    }

    return (
    <>
        {component}
    </>
    )
}

export default Footer
