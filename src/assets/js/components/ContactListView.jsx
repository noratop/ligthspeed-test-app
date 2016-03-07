import React, { Component, PropTypes } from 'react';
import Contact from './Contact';

function ContactListView({list}){
  return (
    <div>
      <ul className='contact-list'>{list.map((contact)=>
          <Contact key={contact.id} contact={contact}/>
      )}</ul>
    </div>
  )
}

export default ContactListView;
