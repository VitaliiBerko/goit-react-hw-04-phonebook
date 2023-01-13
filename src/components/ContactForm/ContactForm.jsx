import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './contactForm.module.css';

export const ContactForm = ({ onSubmit, addContact }) => {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { value, name } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    Notiflix.Notify.init({
      position: 'center-top',
    });

    if (addContact.find(contact => contact.name === name)) {
      Notiflix.Notify.info(`${name} is already in contacts`);
      setName('');
      return;
    }

    onSubmit({ name, number });
    // onSubmit(number);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleOnSubmit} className={s.form}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        className={s.input}
        id={nameInputId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <label htmlFor={numberInputId}>Number</label>
      <input
        className={s.input}
        id={numberInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button className={s.btnAddContact} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
// export class ContactForm extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     name: '',
//     number: '',
//   };

//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   handleChange = e => {
//     const { value, name } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleOnSubmit = e => {
//     e.preventDefault();

//     const { addContact } = this.props;
//     const { name } = this.state;

//     Notiflix.Notify.init({
//       position: 'center-top',
//     });

//     if (addContact.find(contact => contact.name === name)) {
//       Notiflix.Notify.info(`${name} is already in contacts`);
//       this.setState({ name: '' });
//       return;
//     }

//     this.props.onSubmit(this.state);
//     this.resetForm();

//   };

//   resetForm = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form onSubmit={this.handleOnSubmit} className={s.form}>
//         <label htmlFor={this.nameInputId}>Name</label>
//         <input
//           className={s.input}
//           id={this.nameInputId}
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//           value={name}
//           onChange={this.handleChange}
//         />

//         <label htmlFor={this.numberInputId}>Number</label>
//         <input
//           className={s.input}
//           id={this.numberInputId}
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//           value={number}
//           onChange={this.handleChange}
//         />

//         <button className={s.btnAddContact} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }
