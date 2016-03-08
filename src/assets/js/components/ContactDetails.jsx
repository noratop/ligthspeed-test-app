import React, { Component, PropTypes } from 'react';
import EditMode from './EditMode';
import ViewMode from './ViewMode';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {editMode:false};
  }
  onEditHandler = (e) => {
    e.preventDefault();
    this.setState({editMode:true});
  }
  exitEditMode = () => {
    this.setState({editMode:false});
  }
  render() {
    console.log('contact details');
    return (
      <div>
        {this.renderEditButton()}
        {this.renderMode()}
      </div>
    )
  }
  renderEditButton(){
    if (!this.state.editMode) {
      return <a className='contact-details__editButton' href='#' onClick={this.onEditHandler}><EditIcon/></a>
    }
  }
  renderMode(){
    if (this.state.editMode) {
      return <EditMode {...this.props} exitEditMode={this.exitEditMode}/>
    }
    else {
      return <ViewMode {...this.props}/>
    }
  }
}

export default ContactDetails;
