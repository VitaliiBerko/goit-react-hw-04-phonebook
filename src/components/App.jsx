import { useState, useEffect, Fragment } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import s from './app.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    setContacts([{ id: nanoid(), name: name.trim(), number }, ...contacts]);
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handlerFilter = e => {
    setFilter(e.target.value.trim().toLowerCase());
  };

  const findedContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Fragment>
      <h1 className={s.container}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} addContact={contacts} />

      <h2 className={s.container}>Contacts</h2>
      <Filter value={filter} onChange={handlerFilter} />
      <ContactList contacts={findedContacts} onClick={handleDeleteContact} />
    </Fragment>
  );
};

// export const App = ()=> {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     if (JSON.parse(localStorage.getItem('contacts'))) {
//       this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleAddContact = ({ name, number }) => {
//     this.setState(prevState => ({
//       contacts: [
//         { id: nanoid(), name: name.trim(), number },
//         ...prevState.contacts,
//       ],
//     }));
//   };

//   handleDeleteContact = id => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(contact => contact.id !== id),
//       };
//     });
//   };

//   handlerFilter = e => {
//     this.setState({ filter: e.target.value.trim().toLowerCase() });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const findedContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter)
//     );

//     return (
//       <Fragment>
//         <h1 className={s.container}>Phonebook</h1>
//         <ContactForm onSubmit={this.handleAddContact} addContact={contacts} />

//         <h2 className={s.container}>Contacts</h2>
//         <Filter value={filter} onChange={this.handlerFilter} />
//         <ContactList
//           contacts={findedContacts}
//           onClick={this.handleDeleteContact}
//         />
//       </Fragment>
//     );
//   }
// }
