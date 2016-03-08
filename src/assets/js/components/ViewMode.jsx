import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class ViewMode extends Component {
  render() {
    const {firstname,lastname,job,emailaddresses} = this.props;
    return (
      <div>
        <p>{`${firstname} ${lastname}`}</p>
        <p>{job}</p>
        <h4>Emails</h4>
        {emailaddresses.map((email,index)=>{
          return <p key={index}>{email.emailAddress}</p>
        })}
      </div>
    )

  }
}

export default connect(()=>{return {}})(ViewMode);
