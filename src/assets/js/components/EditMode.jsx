import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {saveContact} from '../redux/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import EditEmail from './EditEmail';

class EditMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails:this.props.emailaddresses || [],
      deletedEmailIds:[],
      counter:0
    };
  }

  onCancelHandler = (e) => {
    e.preventDefault();
    this.props.exitEditMode();
  }

  onSaveHandler = (e) => {
    e.preventDefault();
    const {emails,deletedEmailIds} = this.state;
    const {id} = this.props;

    const initContact = {
      id,
      deletedEmailIds,
      emailaddresses:[]
    };

    const contact = Object.keys(this.refs).reduce((obj,key)=>{
      if (key.substring(0,5)==='email') {
          obj.emailaddresses.push({
            isNew: this.refs[key].dataset.new,
            id: this.refs[key].id,
            emailAddress: this.refs[key].value
          });
      }
      else {
          obj[key]=this.refs[key].value;
      }
      return obj;
    },initContact);

    console.log(contact);
    this.props.dispatch(saveContact(contact)).
    then(()=>{this.props.exitEditMode()});
  }

  //email handlers
  removeEmail = (e,index) => {
    e.preventDefault();
    console.log(index);
    const {emails,deletedEmailIds} = this.state;
    const email = this.refs['email'+index];
    const isNew = email.dataset.new;
    const emailArray = [...emails];
    emailArray.splice(index,1);

    console.log(emailArray);
    if (!isNew){
      this.setState({
        emails:emailArray,
        deletedEmailIds:[...deletedEmailIds,email.id]
      });
    }
    else {
      this.setState({
        emails:emailArray
      });
    }
  }

  newEmailHandler = (e) => {
    const index = this.state.emails.length;
    let {counter} = this.state;

    const emails = [
      ...this.state.emails,
      {
        id: counter,
        isNew:true,
        emailAddress: this.refs.addEmail.value
      }
    ];

    this.refs.addEmail.value = '';
    this.setState({
      counter: ++counter,
      emails
    },()=>{this.refs['email'+index].focus();});
  }

  moveCaretAtEnd(e) {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  }

  // Edit rendering
  render() {
    const {firstname,lastname,job,emailaddresses} = this.props;
    console.log(this.state.emails);

    return (
      <div>
        <div className='contact-edit__editButton'>
          <RaisedButton label="Cancel" onClick={this.onCancelHandler} style={{margin: 5}}/>
          <RaisedButton label="Save" primary={true} onClick={this.onSaveHandler} style={{margin: 5}}/>
        </div>
        <div className='dialog__content'>
          <div className='dialog__content__row'>
            <label><nobr>First Name</nobr></label>
            <input type='text' ref='firstname' required={true} defaultValue={firstname}/>
          </div>
          <div className='dialog__content__row'>
            <label><nobr>Last Name</nobr></label>
            <input type='text' ref='lastname' required={true} defaultValue={lastname}/>
          </div>
          <div className='dialog__content__row'>
            <label><nobr>Job Title</nobr></label>
            <input type='text' ref='job' required={true} defaultValue={job}/>
          </div>
        </div>

        <h4>Emails</h4>
        <div>
          {this.state.emails.map((email,index) => {
            return (
              <div key={email.id} className='dialog__content__row'>
                <input type='text' data-new={email.isNew} ref={`email${index}`} id={email.id} required={true} defaultValue={email.emailAddress} onFocus={this.moveCaretAtEnd}/>
                <div className='contact-edit__clearButton' onClick={(e) => {this.removeEmail(e,index)}}><Clear/></div>
              </div>
            )
          })}
          <div className='dialog__content__row'>
            <label><nobr>+</nobr></label>
            <input type='text' ref='addEmail' required={false} placeholder='enter a new email' onKeyUp={this.newEmailHandler}/>
          </div>
        </div>

        {
          //<h4>Adresses</h4>
        }
        <div>
          
        </div>
      </div>
    )

  }
}

export default connect(()=>{return {}})(EditMode);
