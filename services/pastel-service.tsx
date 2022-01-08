import { get, patch,post } from "./api";


const getPastel = () => {
    return get(`/pastel`, false, 'local')
}

const postPedido = (data:any) => {
    return post(`/pedidos`,data, false, 'local')
}

const getPedido = () => {
    return get(`/pedidos`,false, 'local')
}

export {
    getPastel,
    postPedido,
    getPedido
}