const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'hello salon wire another gesture pledge push purpose devote erode finger number',
  'https://rinkeby.infura.io/QvtaQyfQgEChzSNt2f27'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const contractInstance = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Deployed contract address:', contractInstance.options.address)
  // 0x3f6e048A042C13DF9325f6fc28FE684827f49B4F
  console.log('Deployed contract ABI:', compiledFactory.interface)
  // [{"constant":true,"inputs":[],"name":"getAllCampaigns","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minimum","type":"uint256"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allCampaigns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
}

deploy()
