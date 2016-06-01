import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';

class ViewMode extends Component {
    renderEmail(emailaddresses){
        return emailaddresses.map((email,index)=>{
            return <li className="contact-view__email__list__item" key={index}>{email.emailAddress}</li>
        })
    }
  render() {
    const {firstname,lastname,job,emailaddresses} = this.props;
    return (
      <div className="contact-view">
          <div className="contact-view__primary">
              <h2>{`${firstname} ${lastname}`}</h2>
              <h3>{job}</h3>
          </div>
          <div className="contact-view__secondary">
              <Paper zDepth={1} className="contact-view__paper" children={
                  <div className="contact-view__email">
                    <h4>Emails</h4>
                    <ul className="contact-view__email__list">{this.renderEmail(emailaddresses)}</ul>
                  </div>
              }/>
              {
              //<Paper zDepth={1} className="contact-view__paper" children={
              //    <div className="contact-view__email">
              //      <h4>Address</h4>
              //      <ul className="contact-view__email__list"></ul>
              //    </div>
              //}/>
              }
          </div>

      </div>
    )

  }
}

export default connect(()=>{return {}})(ViewMode);
