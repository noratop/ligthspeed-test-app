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

  getContactList = () => {
    const {contacts} = this.props;
    const {sort} = contacts;

    if (contacts.result) {
      switch(sort) {
        case 'lastname':
          return contacts.result.sort((a,b) => {
            return a.lastname.toLowerCase() > b.lastname.toLowerCase()
          })
        break;
        default:
          return contacts.result.sort((a,b) => {
            return a.firstname.toLowerCase() > b.firstname.toLowerCase()
          });
      }
    }
    else {
      return [];
    }
  }
  render() {
  console.log(this.props.contacts);

    return (
      <div className='contact-container'>
        <ContactToolBar userSelection={this.state.userSelection}/>
        {this.renderStatus()}
        <ContactListView list={this.getContactList()}/>
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
    else if (contacts.isSyncing) {
      return 'sync...';
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
