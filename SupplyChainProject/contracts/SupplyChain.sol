// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    uint public productCount = 0;
    mapping(uint => Product) public products;
    mapping(uint => Transfer[]) public transfers;

    enum State {
        Manufacturing,
        InTransit,
        Delivered,
        Received
    }

    struct Product {
        uint id;
        string name;
        string description;
        address owner;
        bool isPurchased;
        State state;
    }

    struct Transfer {
        uint timestamp;
        address from;
        address to;
    }

    event ProductCreated(uint id, string name, string description, address owner, bool isPurchased, State state);
    event ProductPurchased(uint id, address owner, bool isPurchased, State state);
    event OwnershipTransferred(uint productId, uint timestamp, address from, address to);
    event StateChanged(uint id, State state);

    function createProduct(string memory _name, string memory _description) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _description, msg.sender, false, State.Manufacturing);
        emit ProductCreated(productCount, _name, _description, msg.sender, false, State.Manufacturing);
    }

    function purchaseProduct(uint _id) public payable {
        Product storage _product = products[_id];
        require(_id > 0 && _id <= productCount, "Product does not exist.");
        require(!_product.isPurchased, "Product already purchased.");
        require(msg.sender != _product.owner, "Owner cannot purchase their own product.");

        transfers[_id].push(Transfer(block.timestamp, _product.owner, msg.sender));
        _product.owner = msg.sender;
        _product.isPurchased = true;
        _product.state = State.InTransit; // Set the state to InTransit upon purchase

        emit ProductPurchased(_id, msg.sender, true, State.InTransit);
        emit OwnershipTransferred(_id, block.timestamp, _product.owner, msg.sender);
        emit StateChanged(_id, State.InTransit);
    }

    function getProduct(uint _id) public view returns (uint, string memory, string memory, address, bool, State) {
        Product storage product = products[_id];
        return (product.id, product.name, product.description, product.owner, product.isPurchased, product.state);
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory items = new Product[](productCount);
        for (uint i = 1; i <= productCount; i++) {
            items[i - 1] = products[i];
        }
        return items;
    }
   
    function getTransfers(uint _productId) public view returns (Transfer[] memory) {
    return transfers[_productId];
}

}
