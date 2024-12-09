import axios from "axios";
import {PostProduct} from '@/app/types/product'

const URL = "http://localhost:5000/public/product";

const headers = {
    headers: {
        accept: "application/json",
    },
};

export async function getProducts() {
    const response = await axios.get(URL, headers);
    const data = response.data;
    return data;
}

export async function postProduct(product: PostProduct) {
    const response = await axios.post(URL, product, headers);
    return response;
}

export async function deleteProduct(id:number) {
    
    const response = await axios.delete(`${URL}/?product_id=${id}`, headers);
    return response;
    
}

// export async function updateProduct(id, product) {  
//     
// }