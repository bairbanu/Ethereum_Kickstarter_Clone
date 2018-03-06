import React, { Component } from 'react'
import factory from '../ethereum/factory'

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getAllCampaigns().call()

    return { campaigns }
  }

  render() {
    return <h1> { this.props.campaigns } </h1>
  }
}
