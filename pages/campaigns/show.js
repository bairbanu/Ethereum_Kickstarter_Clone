import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import campaignInstance from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/contributeForm'

export default class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = campaignInstance(props.query.address)

    const summary = await campaign.methods.getSummary().call()

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  renderCards() {
    const {
      manager,
      balance,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can make requests to withdraw funds.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution in Wei',
        description: 'Supporter must contribute at least this amount to become a contributor.'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'Requests try to withdraw money from Ethereum smart contract. Requests must be approved by contributors for disbursement of money.'
      },
      {
        header: approversCount,
        meta: 'Number of Contributors',
        description: 'Number of people who have contributed to this campaign.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance in Ether',
        description: 'How much money this campaign has left to spend.'
      }
    ]

    return <Card.Group items={ items } />
  }

  render() {
    return (
      <Layout>
        <h1> Campaign Dashboard </h1>

        <Grid>
          <Grid.Column width={ 10 }>
            { this.renderCards() }
          </Grid.Column>

          <Grid.Column width={ 6 }>
            <ContributeForm address={ this.props.address }/>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}
