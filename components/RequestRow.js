import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import deployedCampaignInstance from '../ethereum/campaign'

export default class RequestRow extends Component {
  onApprove = async () => {
    const campaign = deployedCampaignInstance(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id)
      .send({ from: accounts[0] })
  }

  onFinalize = async () => {
    const campaign = deployedCampaignInstance(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id)
      .send({ from: accounts[0] })
  }

  render() {
    const { Row, Cell } = Table
    const { id, approversCount,
      request: { description, value, recipient, approvalCounts, complete }
    } = this.props
    const readyToFinalize = approvalCounts > approversCount / 2;

    return (
      <Row disabled={ complete } positive={ readyToFinalize && !complete }>
        <Cell>{ id }</Cell>
        <Cell>{ description }</Cell>
        <Cell>{ web3.utils.fromWei(value, 'ether') }</Cell>
        <Cell>{ recipient }</Cell>
        <Cell>{ approvalCounts } / { approversCount }</Cell>
        <Cell>
          { complete ? null :
            (
              <Button color="green" basic onClick={ this.onApprove }> Approve </Button>
            )
          }
        </Cell>
        <Cell>
          { complete ? null :
            (
              <Button color="teal" basic onClick={ this.onFinalize }> Finalize </Button>
            )
          }
        </Cell>
      </Row>
    )
  }
}
