import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class ViewMode extends Component {
  render() {
    const {firstname,lastname,job} = this.props;
    return (
      <div>
        <p>{`${firstname} ${lastname}`}</p>
        <p>{job}</p>
      </div>
    )

  }
}

export default connect(()=>{return {}})(ViewMode);
