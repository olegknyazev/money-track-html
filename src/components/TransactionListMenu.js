import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import TransactionDialog from './TransactionDialog';

export default class TransactionListMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { adding: false };
    this.showAddDialog = this.showAddDialog.bind(this);
    this.addDialogDone = this.addDialogDone.bind(this);
  }
  showAddDialog() {
    this.setState({ adding: true });
  }
  addDialogDone(result) {
    this.setState({ adding: false });
    if (result)
      this.props.onNewTransaction(result.tx);
  }
  render() {
    return (
      <div>
        <Row>
          <Col />
          <Col xs='2'>
            <Button onClick={this.showAddDialog}>Add</Button>
          </Col>
        </Row>
        <TransactionDialog isOpen={this.state.adding} done={this.addDialogDone}/>
      </div>
    );
  }
}
