import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer () {
    const data = new Date().getFullYear()

    return (
        <>
        <footer className="flex justify-center bg-matcha text-coffee">
            <div className="container flex flex-col items-center py-4">
                <p className="text-x1 font-bold">
                    Blog Pessoal Generation | Copyright: {data}
                </p>
                <p className="text-1g"> 
                    Acesse nossas redes sociais
                </p>
                <div className="flex gap-2">
                   <a href="https://www.linkedin.com/in/gabrielimartinsdev/" target="_blank"> 
                   <LinkedinLogoIcon size={48} weight="bold" />
                   </a>
                   <a href="https://www.instagram.com/imgabrielimartins/" target="_blank"> 
                   <InstagramLogoIcon size={48} weight="bold" />
                   </a>
                    <a href="https://github.com/imgabrielimartins" target="_blank"> 
                    <GithubLogoIcon size={48} weight="bold" />
                    </a>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer