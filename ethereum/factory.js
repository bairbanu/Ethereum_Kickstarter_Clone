import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const address = '0x3618CEe769E9EA4E84724abe7fb46897349A9C03'
const ABI = JSON.parse(CampaignFactory.interface)

export default new web3.eth.Contract(ABI, address)
