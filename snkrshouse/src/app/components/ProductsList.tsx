import useCauseRefetch from "../contexts/Refetch";
import { deleteProduct } from "../requests/productsRequests";
import { Product } from "../types/product";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ProductsListProps {
    products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
    const { changeCauseRefetch } = useCauseRefetch();

    const handleDeleteProduct = async (id: number) => {
        const response = await deleteProduct(id);
        if (response.status === 200) {
            console.log("Produto deletado com sucesso");
        }
        changeCauseRefetch();
    };

    if (products.length === 0) {
        return <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sem produtos encontrados</h2>;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produtos</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            {/* Imagem do Produto */}
                            <img
                                alt={product.description}
                                src={product.image}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{`R$${product.price}`}</p>
                            </div>
                            {/* Ícone de Lixeira */}
                            <div className="absolute top-2 right-2">
                                <TrashIcon
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
                                    title="Deletar produto"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
