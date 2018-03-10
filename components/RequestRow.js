import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import web3 from '../ethereum/web3'

export default class RequestRow extends Component {
  render() {
    const { Row, Cell } = Table
    const { id, approversCount,
      request: { description, value, recipient, approvalCounts }
    } = this.props

    return (
      <Row>
        <Cell>{ id }</Cell>
        <Cell>{ description }</Cell>
        <Cell>{ web3.utils.fromWei(value, 'ether') }</Cell>
        <Cell>{ recipient }</Cell>
        <Cell>{ approvalCounts }</Cell>
        <Cell>{ approvalCounts } / { approversCount }</Cell>
        <Cell></Cell>
      </Row>
    )
  }
}
