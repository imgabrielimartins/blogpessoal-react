import { Link } from 'react-router-dom';
import type Postagem from '../../../models/Postagem';

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {

    return (
        <div className='border-coffee border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-coffee py-2 px-4 items-center gap-4">
                    <img 
                        src={postagem.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'}
                        className='h-12 w-12 rounded-full object-cover' 
                        alt={`Foto de ${postagem.usuario?.nome}`} 
                    />
                    <h3 className='text-lg font-bold text-milk uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                <div className='p-4'>
                    <h4 className='text-lg font-semibold uppercase'>
                        {postagem.titulo}
                    </h4>

                    <p className='mt-2'>
                        {postagem.texto}
                    </p>

                    <p className='mt-2 font-semibold'>
                        Tema: {postagem.tema?.descricao}
                    </p>

                    <p className='text-sm text-gray-500 mt-1'>
                        Data: {new Date(postagem.data).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="flex">
                <Link 
                    to={`/editarpostagem/${postagem.id}`} 
                    className='w-full text-milk bg-caramel 
                    hover:bg-matcha flex items-center justify-center py-2 transition'
                >
                    Editar
                </Link>

                <Link 
                    to={`/deletarpostagem/${postagem.id}`} 
                    className='text-milk bg-caramel
                    hover:bg-matcha w-full flex items-center justify-center transition'
                >
                    Deletar
                </Link>
            </div>
        </div>
    );
}

export default CardPostagem
