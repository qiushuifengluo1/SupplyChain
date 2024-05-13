import React, { useEffect, useState } from 'react';

function ViewProducts({ contract }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            if (!contract) return;

            try {
                const count = await contract.methods.productCount().call();
                const productsArray = [];
                for (let i = 1; i <= count; i++) {
                    const productInfo = await contract.methods.getProduct(i).call();
                    productsArray.push({
                        id: productInfo[0].toString(),
                        name: productInfo[1],
                        description: productInfo[2],
                        isPurchased: productInfo[3],
                        state: stateToString(productInfo[5].toString())  // Convert state to readable string
                    });
                }
                setProducts(productsArray);
            } catch (error) {
                alert('Failed to load products: ' + error.message);
            }
        };

        loadProducts();
    }, [contract]);

    const stateToString = (state) => {
        switch (state) {
            case "0": return "Manufacturing";
            case "1": return "InTransit";
            case "2": return "Delivered";
            case "3": return "Received";
            default: return "Unknown";
        }
    };

    return (
        <div>
            <h2 className="products-title">Products List</h2>
            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <p className="product-info">ID: {product.id}</p>
                    <p className="product-info">Name: {product.name}</p>
                    <p className="product-info">Description: {product.description}</p>
                    <p className="product-info">Status: {product.state}</p>
                </div>
            ))}
        </div>
    );
}

export default ViewProducts;
