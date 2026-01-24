import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div
            className="
                border border-coffee
                bg-caramel
                flex flex-col rounded-xl overflow-hidden justify-between
                shadow-md
                transition-transform
                hover:scale-[1.01]
                min-h-55
            "
        >
            <div className="
                flex flex-1 flex-col items-center justify-center
                px-6 py-10 gap-2
            ">
                <span className="text-xs uppercase tracking-widest text-milk">
                    Tema
                </span>

                <p
                    className="
                        text-2xl font-semibold text-matcha
                        text-center leading-snug
                    "
                >
                    {tema.descricao}
                </p>
            </div>

            {/* AÇÕES */}
            <div className="flex border-t border-coffee">
                <Link
                    to={`/editartema/${tema.id}`}
                    className="
                        w-full py-3 text-center
                        text-sm font-medium text-matcha
                        hover:bg-coffee
                        transition-colors
                    "
                >
                    Editar
                </Link>

                <Link
                    to={`/deletartema/${tema.id}`}
                    className="
                        w-full py-3 text-center
                        text-sm font-medium text-matcha
                        hover:bg-coffee
                        transition-colors
                    "
                >
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardTema