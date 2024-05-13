import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // 请求用户授权
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject('User denied access to accounts.');
        }
      } else {
        // Ganache本地网络; 确保Ganache运行在此端口
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        resolve(web3);
      }
    });
  });

export default getWeb3;
