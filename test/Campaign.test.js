const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const provider = ganache.provider()
const web3 = new Web3(provider)

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts, factory, campaignAddress, campaign

beforeEach(async () => {
  const accounts = await web3.eth.getAccounts()

  factory = new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  })

  [ campaignAddress ] = await factory.methods.getAllCampaigns().call()
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  )
})
