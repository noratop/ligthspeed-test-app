import React, { Component, PropTypes } from 'react';
import ContactListView from '../components/ContactListView';
import {connect} from 'react-redux';
import {fetchContacts} from '../redux/actions';

class Contacts extends Component {
  constructor(props) {
     super(props);
     this.state = {};
   }

  componentDidMount() {
      this.props.dispatch(fetchContacts());
  }

  // componentWillReceiveProps(nextProps) {
  //     this.props.dispatch(fetchContacts());
  // }

  render() {
    return (
      <div>
        <h2>Filter bar</h2>
        {this.renderContacts()}
      </div>
    )
  }

  renderContacts() {
    const {contacts} = this.props;

    if (contacts.error) {
      return 'An error occurred: ' + JSON.stringify(contacts.error);
    }
    else if (contacts.isFetching || !contacts.result) {
      return 'loading...';
    }
    else if (contacts.result.length === 0) {
      return 'no contacts...';
    }
    else {
      return <ContactListView list={contacts.result}/>;
    }
  }
}


function mapStateToProps(store) {
  return {
    contacts: store.contacts,
  };
}

export default connect(mapStateToProps)(Contacts);
