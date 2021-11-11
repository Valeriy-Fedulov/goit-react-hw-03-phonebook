import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import { ContactForm } from './components/contactform';
import { ContactList } from './components/contactlist';
import { Filter } from './components/filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    localStorage.getItem('contacts') &&
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  changeFilter = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  formSubmitHandler = data => {
    const item = [...this.state.contacts, data];
    this.setState({ contacts: item });
    localStorage.setItem('contacts', JSON.stringify(item));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  filter: PropTypes.string,
};

export { App };
