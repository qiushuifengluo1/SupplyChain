import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import getWeb3 from './getWeb3';
import SupplyChainContract from './contracts/SupplyChain.json';
import CreateProduct from './components/CreateProduct';
import PurchaseProduct from './components/PurchaseProduct';
import ViewProducts from './components/ViewProducts';
import AccountSelector from './components/AccountSelector';
import ViewTransfers from './components/ViewTransfers';
import logo from './logo.svg';
import backgroundImage from './images/background.jpg';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    // Initialize web3, accounts, and contract
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SupplyChainContract.networks[networkId];
        const contract = new web3.eth.Contract(
          SupplyChainContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
        if (accounts.length > 0) {
          setSelectedAccount(accounts[0]);
        }
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    initWeb3();
  }, []);

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
  };

  // Apply background image style to the whole app
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'auto'
  };

  return (
    <Router>
      <div className="App" style={appStyle}>
        <header className="App-header">
          <div className="nav-links">
            <div className="left-links">
              <Link className="nav-link" to="/create">Create Product</Link>
              <Link className="nav-link" to="/purchase">Purchase Product</Link>
              <Link className="nav-link" to="/view">View Products</Link>
              <Link className="nav-link" to="/transfers">View Transfers</Link>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Welcome to the Supply Chain Application</h1>
          </div>
        </header>
        <AccountSelector accounts={accounts} onSelectAccount={handleAccountChange} />
        <Switch>
          <Route path="/create">
            <CreateProduct web3={web3} accounts={accounts} account={selectedAccount} contract={contract} />
          </Route>
          <Route path="/purchase">
            <PurchaseProduct web3={web3} accounts={accounts} account={selectedAccount} contract={contract} />
          </Route>
          <Route path="/view">
            <ViewProducts web3={web3} accounts={accounts} account={selectedAccount} contract={contract} />
          </Route>
          <Route path="/transfers">
            <ViewTransfers contract={contract} />
          </Route>
          <Route exact path="/">
            {/* Home route can be kept empty or used for another component */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
