import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {checkContact} from '../redux/actions';
import ContactDetails from './ContactDetails';
import Paper from 'material-ui/lib/paper';
import Checkbox from 'material-ui/lib/checkbox';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {open:false};
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render(){
    const {contact} = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <li className='contact-list__item'>
          <Paper className='contact-list__paper' rounded={false} children={
              <div className='contact-list__paper__container'>
                <Checkbox style={{display:'inline-block',width:'auto'}} onCheck={(event)=>{this.props.dispatch(checkContact(this.props.contact.id))}} checked={this.props.contact.checked}/>
                  <a className='contact-list__paper__detail' href='#' onClick={this.handleOpen}>{`${contact.firstname} ${contact.lastname}`}</a>
                  <a className='contact-list__paper__detail' href='#' onClick={this.handleOpen}>{contact.job}</a>
                  <a className='contact-list__paper__detail' href='#' onClick={this.handleOpen}>{contact.emailaddresses[0]? contact.emailaddresses[0].emailAddress:''}</a>
              </div>
          }/>

        <Dialog
          className='dialog'
          contentClassName='dialog__content'
          title={`${contact.firstname} ${contact.lastname}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ContactDetails {...contact}/>
        </Dialog>
      </li>
    )
  }
}

export default connect(()=>{return {}})(Contact);
