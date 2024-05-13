import React, { useState } from 'react';

function PurchaseProduct({ web3, accounts, contract, account }) {
  const [productId, setProductId] = useState('');

  const handlePurchase = async (event) => {
    event.preventDefault();
    if (!contract) {
      alert("Blockchain contract is not loaded.");
      return;
    }
    if (!productId) {
      alert("Please enter a product ID.");
      return;
    }

    try {
      const productInfo = await contract.methods.getProduct(productId).call();
      const product = {
        id:productInfo[0],
        name:productInfo[1],
        description:productInfo[2],
        owner:productInfo[3],
        isPurchased:productInfo[4],
        state:productInfo[5]
        };

      if(account.toLowerCase() === product.owner.toLowerCase()){
        alert("You cannot purchase your own product.");
        return;
        }
      const price = web3.utils.toWei('10', 'ether');  // 假设每个产品的价格为10 Ether
      const productIdNumber = Number(productId);
      await contract.methods.purchaseProduct(productIdNumber).send({ from: account, gas:5000000 });
      alert('Product purchased successfully!');
      setProductId('');
    } catch (error) {
      alert(`Failed to purchase product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handlePurchase} className="purchase-form">
      <h2>Purchase a Product</h2>
      <div>
        <label>
          Product ID:
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
      </div>
      <button type="submit">Purchase Product</button>
    </form>
  );
}

export default PurchaseProduct;
