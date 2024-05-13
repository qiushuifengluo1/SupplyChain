import React, { useState } from 'react';

function CreateProduct({ web3, accounts, contract, account }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!contract) {
      alert("Blockchain contract is not loaded.");
      return;
    }
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await contract.methods.createProduct(name, description).send({ from: account, gas: 500000 });
      alert('Product created successfully!');
      setName('');
      setDescription('');
    } catch (error) {
      alert(`Failed to create product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleCreate} className="create-product-form">
      <h2>Create a New Product</h2>
      <div>
        <label>
          Product Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;
