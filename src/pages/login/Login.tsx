import { Link } from 'react-router-dom';
import cadastro from "../../assets/img/cadastro.png"

function Login() {
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold'>
      <form className='flex justify-center items-center flex-col w-1/2 gap-4'>
          <h2 className='text-coffee text-5x1'>
              Entrar
          </h2>
          <div className='flex flex-col w-full'>
              <label htmlFor='usuario'>Usuário</label>
              <input
                  type='text'
                  id='usuario'
                  name='usuario'
                  placeholder='Usuario'
                  className='border-2 border-coffee rounded p-2'
              ></input>
          </div>
          <div className='flex flex-col w-full'>
              <label htmlFor='senha'>Senha</label>
              <input
                  type='password'
                  id='senha'
                  name='senha'
                  placeholder='Senha'
                  className='border-2 border-coffee rounded p-2'
                  ></input>
          </div>
          <button
            type='submit'
            className='rounded bg-cream flex justify-center hover:bg-matcha text-coffee w-1/2 py-2'>
              <span>Entrar</span>
            </button>

            <hr className='border-coffee w-full'></hr>
            <p>
              Ainda não tem conta?{'  '}
              <Link to="/cadastro" className='text-coffee hover:underline'>
                Cadastre-se
              </Link>
            </p>
      </form>
        <div style={{ backgroundImage: `url(${cadastro})` }}
        className='lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center'
        >
        </div>
    </div>
    </>
  )
}

export default Login;