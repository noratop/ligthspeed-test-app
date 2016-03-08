import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// import {saveEmail,deleteEmail} from '../redux/actions';

class EditEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: this.props.emails
    };
  }

  onChangeHandler = (e) => {
    console.log('change');
    if (e.key === 'Enter'){
      console.log('enter');

      const newEmail = {
        key: this.state.emails.length+1,
        emailAddress: this.refs.newEmail.value
      };

      const newEmails = [
        ...this.state.emails,
        newEmail
      ];

      this.props.addEmail(newEmail);
      this.refs.newEmail.value = '';
      this.setState({emails:newEmails});
    }
  }

  renderInput({key,label,type,name,required,defaultValue}){
    // <label htmlFor={name}><nobr>{label}</nobr></label>

    return (
      <div key={key} className='dialog__content__row'>
        <input type='text' ref={name} required={required} defaultValue={defaultValue}/>
      </div>
    )
  }

  render() {
    const {emails} = this.state;
    return (
      <div>
        {emails.map((email,index) => {
          console.log(index);
          return this.renderInput({
            key: index,
            label:'type',
            type:'text',
            name:'email',
            required:true,
            defaultValue:email.emailAddress
          })
        })}
        <div className='dialog__content__row'>
          <label htmlFor='newEmail'><nobr>+</nobr></label>
          <input type='text' ref='newEmail' required={false} placeholder='add email (and press Enter)' onKeyUp={this.onChangeHandler}/>
        </div>
      </div>
    )
  }
}

export default connect(()=>{return {}})(EditEmail);
