import React, { Component, PropTypes } from 'react';
import ContactListView from '../components/ContactListView';
import ContactToolBar from '../components/ContactToolBar';
import {connect} from 'react-redux';
import {fetchContacts} from '../redux/actions';

class Contacts extends Component {
  constructor(props) {
     super(props);
     this.state = {userSelection:[]};
   }

  componentDidMount() {
      this.props.dispatch(fetchContacts());
  }

  render() {
  console.log(this.props.contacts);
    const {contacts} = this.props;

    return (
      <div className='contact-container'>
        <ContactToolBar userSelection={this.state.userSelection}/>
        {this.renderStatus()}
        <ContactListView list={contacts.result || []}/>
      </div>
    )
  }

  renderStatus() {
    const {contacts} = this.props;

    if (contacts.error) {
      return 'An error occurred: ' + JSON.stringify(contacts.error);
    }
    else if (contacts.isDeleting) {
      return 'deleting contacts...';
    }
    else if (contacts.isRefreshing) {
      return 'refreshing...';
    }
    else if (contacts.isFetching) {
      return 'loading...';
    }
    else if (contacts.result && contacts.result.length === 0) {
      return 'no contacts...';
    }
  }
}


function mapStateToProps(store) {
  return {
    contacts: store.contacts,
  };
}

export default connect(mapStateToProps)(Contacts);
