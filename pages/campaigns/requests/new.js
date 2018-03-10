import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'

import Layout from '../../../components/Layout'
import deployedCampaignInstance from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'

export default class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  onSubmit = async event => {
    event.preventDefault()

    const campaign = deployedCampaignInstance(this.props.address)
    const { description, value, recipient } = this.state

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })

      Router.pushRoute(`/campaigns/${this.props.address}`)
    } catch(err) {
      this.setState({ errorMessage: err.message })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <Link route={ `/campaigns/${this.props.address}/requests`}>
          <a> Back </a>
        </Link>

        <h3> Create a Request </h3>

        <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
          <Form.Field>
            <label> Description </label>
            <Input
              value={ this.state.description }
              onChange={ event => this.setState({ description: event.target.value }) }
            />
          </Form.Field>

          <Form.Field>
            <label> Value in Ether </label>
            <Input
              value={ this.state.value }
              onChange={ event => this.setState({ value: event.target.value }) }
            />
          </Form.Field>

          <Form.Field>
            <label> Recipient </label>
            <Input
              value={ this.state.recipient }
              onChange={ event => this.setState({ recipient: event.target.value }) }
            />
          </Form.Field>

          <Message error header="Oops!" content={ this.state.errorMessage }/>
          <Button loading={ this.state.loading } primary> Create </Button>
        </Form>
      </Layout>
    )
  }
}
