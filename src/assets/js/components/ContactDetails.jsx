import React, { Component, PropTypes } from 'react';
import EditMode from './EditMode';
import ViewMode from './ViewMode';

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {editMode:false};
  }
  onClick(e){
    e.preventDefault();
    this.setState({editMode:true});
  }
  saveChanges(){
    this.setState({editMode:false});
  }
  render() {
  console.log('contact details');
    return (
      <div>
        <h2>Contact Details</h2>
        {this.renderEditButton()}
        {this.renderMode()}
      </div>
    )
  }
  renderEditButton(){
    if (!this.state.editMode) {
      return <a href='#' onClick={this.onClick.bind(this)}>edit</a>
    }
  }
  renderMode(){
    if (this.state.editMode) {
      return <EditMode {...this.props} saveChanges={this.saveChanges.bind(this)}/>
    }
    else {
      return <ViewMode {...this.props}/>
    }
  }
}

export default ContactDetails;
