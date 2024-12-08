import axios from "axios";
import {PostProduct} from '@/app/types/product'

const URL = "http://localhost:5000/public/product";

export async function getProducts() {
    const headers = {
        headers: {
            accept: "application/json",
        },
    };
    const response = await axios.get(URL, headers);
    const data = response.data;
    return data;
}

export async function postProduct(product: PostProduct) {
    const headers = {
        headers: {
            accept: "application/json",
        },
    };
    console.log(product);
    const response = await axios.post(URL, product, headers);
    return response;
}

// export async function deleteProduct(id) {
//     
// }

// export async function updateProduct(id, product) {  
//     
// }