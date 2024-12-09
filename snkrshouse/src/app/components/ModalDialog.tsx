"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import useOpenModal from "../contexts/Dialog";
import { postProduct } from "../requests/productsRequests";
import { PostProduct } from "../types/product";

export default function ModalDialog() {
    const { open, changeOpen } = useOpenModal();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState<File>();

    const handleSubmit = async () => {
        if (!name || !description || !price || !file) {
            alert("Preencha todos os campos para adicionar um produto.");
            return;
        }
        const toBase64 = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                if (!file) {
                    reject(new Error("No file provided."));
                    return;
                }
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });

        const base64 = await toBase64(file);

        const product: PostProduct = {
            name,
            description,
            price: parseFloat(price),
            image: base64,
        };

        try {
            const response = await postProduct(product);
            if (response.status === 201) {
                alert("Product added successfully:");
                changeOpen();
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Dialog open={open} onClose={changeOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <form>
                                <DialogTitle>Adicionar Produto</DialogTitle>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Descrição
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Descrição"
                                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Valor do produto"
                                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        setFile(selectedFile);
                                        console.log("Selected file:", selectedFile);
                                    }}
                                    className="w-full mt-4 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </form>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    handleSubmit();
                                    changeOpen();
                                }}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            >
                                Enviar
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => changeOpen()}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            >
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
