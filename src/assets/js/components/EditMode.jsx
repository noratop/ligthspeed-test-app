import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {saveContact} from '../redux/actions';

class EditMode extends Component {
  handleChange(){

  }
  onCancel(e){
    e.preventDefault();
    this.props.exitEditMode();
  }
  onSave(e){
    e.preventDefault();
    const contact = Object.keys(this.refs).reduce((obj,key)=>{
      obj[key]=this.refs[key].value;
      return obj;
    },{id: this.props.id});

    this.props.dispatch(saveContact(contact)).
    then(()=>{this.props.exitEditMode()});
  }
  render() {
    const {firstname,lastname,job} = this.props;
    return (
      <div>
        <a href='#' onClick={this.onCancel.bind(this)}>cancel</a>
        <a href='#' onClick={this.onSave.bind(this)}>save</a>
        <ul>
          <li>
            <label>First Name</label>
            <input type='text' ref="firstname" defaultValue={firstname} onChange={this.handleChange}/>
          </li>
          <li>
            <label>Last Name</label>
            <input type='text' ref="lastname" defaultValue={lastname} onChange={this.handleChange}/>
          </li>
          <li>
            <label>Job title</label>
            <input type='text' ref="job" defaultValue={job||''} onChange={this.handleChange}/>
          </li>
        </ul>
        <h3>Emails</h3>
        <ul>

        </ul>
      </div>
    )

  }
}

export default connect(()=>{return {}})(EditMode);
