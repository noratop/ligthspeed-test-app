import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {checkContact} from '../redux/actions';
import Modal from 'simple-react-modal';
import ContactDetails from './ContactDetails';
import Paper from 'material-ui/lib/paper';
import Checkbox from 'material-ui/lib/checkbox';

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
      <li className='contact-list__item'>
          <Paper className='contact-list__paper' rounded={false} children={
              <div className='contact-list__paper__container'>
                <Checkbox style={{display:'inline-block',width:'auto'}} onCheck={(event)=>{this.props.dispatch(checkContact(this.props.contact.id))}} checked={this.props.contact.checked}/>
                <a className='contact-list__paper__name' href='#' onClick={this.show.bind(this)}>{`${contact.firstname} ${contact.lastname}`}</a>
              </div>
          }/>

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

export default connect(()=>{return {}})(Contact);
