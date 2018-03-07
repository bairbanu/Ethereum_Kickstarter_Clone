import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const address = '0x36BC0a62aD3f0d130739d3b068A720c13d309629'
const ABI = JSON.parse(CampaignFactory.interface)

export default new web3.eth.Contract(ABI, address)
