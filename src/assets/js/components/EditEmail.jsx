import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// import {saveEmail,deleteEmail} from '../redux/actions';

class EditEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: this.props.emails,
    };
  }

  deleteEmail = (emailId) => {

  }

  newEmailHandler = (e) => {
    const index = this.state.emails.length;

    const emails = [
      ...this.state.emails,
      {emailAddress: this.refs.addEmail.value}
    ];

    this.refs.addEmail.value = '';
    this.setState({emails},()=>{this.refs['email'+index].focus();});
  }

  moveCaretAtEnd(e) {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  }

  render() {
    const {emails,newEmails} = this.state;
    return (
      <div>
        {this.state.emails.map((email,index) => {
          return (
            <div key={index} className='dialog__content__row'>
              <input type='text' ref={`email${index}`} id={email.id} required={true} defaultValue={email.emailAddress} onFocus={this.moveCaretAtEnd}/>
            </div>
          )
        })}
        <div className='dialog__content__row'>
          <label><nobr>+</nobr></label>
          <input type='text' ref='addEmail' required={false} placeholder='enter a new email' onKeyUp={this.newEmailHandler}/>
        </div>
      </div>
    )
  }
}

export default connect(()=>{return {}})(EditEmail);
