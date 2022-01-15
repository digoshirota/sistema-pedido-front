import { get, patch,post ,del} from "./api";


const getPastel = () => {
    return get(`/pastel`, false, 'local')
}
const getSalgado= () => {
    return get(`/salgado`, false, 'local')
}
const getBebida = () => {
    return get(`/bebida`, false, 'local')
}

const postPedido = (data:any) => {
    return post(`/pedidos`,data, false, 'local')
}

const postCadastro = (data:any) => {
    return post(`/produtos`,data, false, 'local')
}
const deleteCadastro = (data:any) => {
    return del(`/produtos`,data, false, 'local')
}

const getPedido = () => {
    return get(`/pedidos`,false, 'local')
}

export {
    getPastel,
    postPedido,
    getPedido,
    postCadastro,
    deleteCadastro,
    getSalgado,
    getBebida
}