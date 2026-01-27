import homeIMG from "../../assets/img/homeimg.png";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagem";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <main className="bg-caramel flex justify-center">

        <section className="container grid grid-cols-1 md:grid-cols-2 text-milk">

          <article className="flex flex-col gap-4 items-center justify-center py-8 text-center">
            
            <h1 className="text-5xl font-bold">
              Seja Bem-Vinde!
            </h1>

            <p className="text-xl">
              Expresse aqui seus pensamentos e opiniões.
            </p>

            <ModalPostagem />

          </article>

          <figure className="flex justify-center items-center py-8">
            <img
              src={homeIMG}
              alt="Ilustração da página inicial"
              className="w-2/3 max-w-md"
            />
          </figure>

        </section>

      </main>

      <section className="w-full">
        <ListaPostagens />
      </section>
    </>
  );
}

export default Home;
