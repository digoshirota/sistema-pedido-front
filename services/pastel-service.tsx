import { get, patch } from "./api";


const getPastel = () => {
    return get(`/pastel`, false, 'local')
}

export {
    getPastel,
}