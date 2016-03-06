import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Modal from 'simple-react-modal';
import {deleteSelectedContacts} from '../redux/actions';

class DeleteContactButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(e){

  }

  show(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  onConfirm(e){
    e.preventDefault();
    const {userSelection} = this.props;
    this.props.dispatch(deleteSelectedContacts(userSelection)).
    then(()=>{this.close()});
  }

  render(){
    return (
      <div>
        <a href='#' onClick={this.show.bind(this)}>Delete</a>
        <Modal
          className="test-class"
          closeOnOuterClick={true}
          show={this.state.show}
          onClose={this.close.bind(this)}>
          <p>Are you sure you want to delete the selected contacts?</p>
          <a href='#' onClick={this.onConfirm.bind(this)}>Confirm</a>
          <a href='#' onClick={this.close.bind(this)}>Cancel</a>

        </Modal>
      </div>
    )
  }
}

export default connect(()=>{return {}})(DeleteContactButton);
