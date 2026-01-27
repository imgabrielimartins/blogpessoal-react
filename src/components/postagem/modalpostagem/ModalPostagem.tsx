import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-milk hover:coffee'>
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    background: '#ABBF9B', 
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    boxShadow: '0 0 32px rgba(171,191,155,0.45)',
                    border: '1px solid rgb(137,153,124)'
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;