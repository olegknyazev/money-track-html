import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import NewTransactionDialog from './NewTransactionDialog';

class TransactionListMenu extends Component {
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
    console.log("RESULT: " + result);
    this.setState({ adding: false });
  }
  render() {
    return (
      <div>
        <Row>
          <Col />
          <Col xs="2">
            <Button onClick={this.showAddDialog}>Add</Button>
          </Col>
        </Row>
        <NewTransactionDialog isOpen={this.state.adding} done={this.addDialogDone}/>
      </div>
    );
  }
}

export default TransactionListMenu;
