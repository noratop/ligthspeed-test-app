import React, { Component, PropTypes } from 'react';
import Modal from 'simple-react-modal';
import ContactDetails from './ContactDetails';

class Contact extends Component {
  constructor(props){
      super(props)
      this.state = {}
    }

  show(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  render(){
    const {contact} = this.props;
    return (
      <li>
        <a href='#' onClick={this.show.bind(this)}>{`${contact.firstname} ${contact.lastname}`}</a>

        <Modal
        className="test-class" //this will completely overwrite the default css completely
        closeOnOuterClick={true}
        show={this.state.show}
        onClose={this.close.bind(this)}>

          <a href='#' onClick={this.close.bind(this)}>Close</a>
          <ContactDetails {...contact}/>

        </Modal>
      </li>
    )
  }
}

export default Contact;
