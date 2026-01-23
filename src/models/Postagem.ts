import type Tema from "./Tema";

export default interface Postagem{
    usuario: any;
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema?: Tema;
}