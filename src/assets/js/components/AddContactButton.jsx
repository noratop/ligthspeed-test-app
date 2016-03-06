import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Modal from 'simple-react-modal';
import {addContact} from '../redux/actions';

class AddContactButton extends Component {
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

  onSubmit(e){
    e.preventDefault();
    const contact = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value
    }

    this.props.dispatch(addContact(contact));
  }

  render(){
    return (
      <div>
        <a href='#' onClick={this.show.bind(this)}>new Contacts</a>
        <Modal
          className="test-class"
          closeOnOuterClick={true}
          show={this.state.show}
          onClose={this.close.bind(this)}>

          <a href='#' onClick={this.close.bind(this)}>Close</a>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label htmlFor='firstname'>First Name:</label>
            <input type='text' id='firstname' required='true'/>
            <label htmlFor='lastname'>Last Name:</label>
            <input type='text' id='lastname' required='true'/>
            <input type='submit' value='Add'/>
          </form>

        </Modal>
      </div>
    )
  }
}

export default connect(()=>{return {}})(AddContactButton);
