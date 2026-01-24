import homeIMG from "../../assets/img/homeimg.png";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagem";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <main className="bg-caramel flex justify-center mb-0">
        <section className="container grid grid-cols-1 md:grid-cols-2 text-milk">

          <article className="flex flex-col gap-4 items-center justify-center py-4">
            <h1 className="text-5xl font-bold text-center">
              Seja Bem Vinde!
            </h1>

            <p className="text-xl text-center">
              Expresse aqui seus pensamentos e opiniões
            </p>

            <ModalPostagem />
          </article>

          <figure className="flex justify-center">
            <img
              src={homeIMG}
              alt="Imagem da página inicial"
              className="w-2/3"
            />
          </figure>

        </section>
      </main>

      <ListaPostagens />
    </>
  );
}

export default Home;
