import home from "../../assets/img/home.png"

function Home() {
  return (
    <>
      <main className="bg-caramel flex justificy-center">
        <section className="container grid grid-cols-2 text-milk">
          <article className="flex flex-col gap-4 items-center justify-center py-4">
             <h1 className="text-5xl font-bold ">Seja Bem Vinde!</h1>
             <p className="text-x1" >Expresse aqui seus pensamentos e opiniões</p>
             <button className="rounded text-milk border-matcha border-solid border-2 py-1 px-4">
                Nova Postagem
                </button>
          </article>
          <figure className="flex justify-center">
            <img src={home} alt="imagem home" className="w-2/3 ml-auto"/>
          </figure>
        </section>
      </main>
    </>
  );
}
export default Home;