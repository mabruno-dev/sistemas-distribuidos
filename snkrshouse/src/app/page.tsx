"use client";
import ProductsList from "./components/ProductsList";
import { getProducts } from "./requests/productsRequests";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import ModalDialog from "./components/ModalDialog";
import useOpenModal from "./contexts/Dialog";
import delay from "delay";
import useCauseRefetch from "./contexts/Refetch";

export default function Home() {
    const [products, setProducts] = useState([] as Product[]);
    const [loading, setLoading] = useState(true);
    const { open } = useOpenModal();
    const { causeRefetch } = useCauseRefetch();

    const fetchProducts = async () => {
        setLoading(true);
        await delay(2000);
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } finally {
            setLoading(false);
        }
    };

    console.log(causeRefetch);

    useEffect(() => {
        fetchProducts();
    }, [causeRefetch]);

    useEffect(() => {
        if (!open) {
            fetchProducts();
            console.log("oi");
        }
    }, [open]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <ModalDialog />
            <ProductsList products={products} />
        </div>
    );
}
