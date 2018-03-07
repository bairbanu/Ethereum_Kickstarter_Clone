import web3 from './web3'
import Campaign from './build/Campaign.json'

const ABI = JSON.parse(Campaign.interface)

export default address => {
  return new web3.eth.Contract(ABI, address)
}
