import React, { useState, useEffect } from 'react';

function ViewTransfers({ contract }) {
    const [productId, setProductId] = useState('');
    const [transfers, setTransfers] = useState([]);

    const fetchTransfers = async () => {
        if (!contract || !productId) return;
        try {
            const transfersData = await contract.methods.getTransfers(productId).call();
            setTransfers(transfersData);
        } catch (error) {
            alert(`Failed to fetch transfers: ${error.message}`);
        }
    };

    return (
        <div>
            <h2 className="view-transfers-title">View Product Transfers</h2>
            <input
                className="view-transfers-input"
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID"
            />
            <button className="view-transfers-button" onClick={fetchTransfers}>Fetch Transfers</button>
            {transfers.length > 0 && (
                <ul className="view-transfers-list">
                    {transfers.map((transfer, index) => (
                        <li key={index}>
                            Time: {new Date(parseInt(transfer.timestamp.toString()) * 1000).toLocaleString()} - From: {transfer.from} - To: {transfer.to}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ViewTransfers;
