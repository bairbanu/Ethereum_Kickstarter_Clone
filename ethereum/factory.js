import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const address = '0x3f6e048A042C13DF9325f6fc28FE684827f49B4F'
const ABI = JSON.parse(CampaignFactory.interface)

export default new web3.eth.Contract(ABI, address)
