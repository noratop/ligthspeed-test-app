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

  // componentWillReceiveProps(nextProps) {
  //     this.props.dispatch(fetchContacts());
  // }

  onCheckedContactItem(id) {
    const {userSelection} = this.state;
    const unselectedContactIndex = userSelection.indexOf(id);
    console.log(unselectedContactIndex);

    if (unselectedContactIndex >= 0) {
      userSelection.splice(unselectedContactIndex,1);
    }
    else {
      userSelection.push(id);
    }

    this.setState({userSelection});
  }

  render() {
    const {contacts} = this.props;

    return (
      <div>
        <h2>Filter bar</h2>
        <ContactToolBar userSelection={this.state.userSelection}/>
        {this.renderStatus()}
        <ContactListView list={contacts.result || []} onCheckedContactItem={this.onCheckedContactItem.bind(this)}/>
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
