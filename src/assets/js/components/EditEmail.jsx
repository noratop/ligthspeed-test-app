import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// import {saveEmail,deleteEmail} from '../redux/actions';

class EditEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: this.props.emails,
      newEmails:[]
    };
  }

  handleChange(event,index) {
    console.log(event.target.value);
    this.setState({['newEmail'+index]: event.target.value});
  }

  onChangeHandler = (e) => {
    const index = this.state.newEmails.length;
    console.log(index);
    const value = this.refs.addEmail.value;
    const newEmail = {
      key: index,
      emailAddress: value
    };

    const newEmails = [
      ...this.state.newEmails,
      newEmail
    ];

    this.props.addEmail(newEmail);
    this.refs.addEmail.value = '';
    this.setState({['newEmail'+index]:value,newEmails},()=>{this.refs['newEmail'+index].focus();});
  }

  render() {
    const {emails,newEmails} = this.state;
    return (
      <div>
        {emails.map((email,index) => {
          return (
            <div key={index} className='dialog__content__row'>
              <input type='text' ref={`email${index}`} required={true} defaultValue={email.emailAddress}/>
            </div>
          )
        })}
        {newEmails.map((email,index) => {
          return (
              <div key={index} className='dialog__content__row'>
                <input type='text' ref={`newEmail${index}`} required={true} autoFocus={true} value={this.state['newEmail'+index]} onChange={(e)=>{this.handleChange(e,index)}}/>
              </div>
          )
        })}
        <div className='dialog__content__row'>
          <label htmlFor='newEmail'><nobr>+</nobr></label>
          <input type='text' ref='addEmail' required={false} placeholder='add email (and press Enter)' onKeyUp={this.onChangeHandler}/>
        </div>
      </div>
    )
  }
}

export default connect(()=>{return {}})(EditEmail);
