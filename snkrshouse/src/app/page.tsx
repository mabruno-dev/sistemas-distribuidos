"use client";
import ProductsList from "./components/ProductsList";
import { getProducts } from "./requests/productsRequests";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import ModalDialog from "./components/ModalDialog";
import useOpenModal from "./hooks/Dialog";

export default function Home() {
    const [products, setProducts] = useState([] as Product[]);
    const [loading, setLoading] = useState(true);
    const { changeOpen, open } = useOpenModal();

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            console.log(productsData);
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!open) fetchProducts();
    }, [open]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ModalDialog />
            <ProductsList products={products} />
        </div>
    );
}
