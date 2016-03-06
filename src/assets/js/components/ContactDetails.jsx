import React, { Component, PropTypes } from 'react';

function ContactDetails(props) {
  const {firstname,lastname} = props;
  return (
    <ul>
      <li>{firstname}</li>
      <li>{lastname}</li>
    </ul>
  )
}

export default ContactDetails;
