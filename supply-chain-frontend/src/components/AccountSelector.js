import React from 'react';

const AccountSelector = ({ accounts, onSelectAccount }) => {
  return (
  <div>
    <label htmlFor="account-select" className="AccountSelector-label">AccountSelector：</label>
    <select onChange={(e) => onSelectAccount(e.target.value)} defaultValue="">
      {accounts && accounts.map(account => (
        <option key={account} value={account}>
          {account}
        </option>
      ))}
    </select>
  </div>
  );
};

export default AccountSelector;
