import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../../redux/contacts/contacts-operations";
import shortid from "shortid";
import styles from "../contact-form/ContactForm.module.css";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";
import {
  idOfContactToChange,
  nameToChange,
  numberToChange,
} from "../contact-list/ContactList";

export default function EditForm({ onSave }) {
  const dispatch = useDispatch();
  const [id, setId] = useState(idOfContactToChange);
  const [name, setName] = useState(nameToChange);
  const [number, setNumber] = useState(numberToChange);

  const contacts = useSelector(contactSelectors.getVisibleContacts);

  const handleName = (event) => {
    const { value } = event.currentTarget;
    setName(value);
  };
  const handleNumber = (event) => {
    const { value } = event.currentTarget;
    setNumber(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    contacts.find((contact) => contact.number === number)
      ? alert(`Number ${number} is already in the contacts`)
      : dispatch(contactOperations.editContact({ id, name, number }));
    reset();
    onSave();
  };
  const reset = () => {
    setId("");
    setName("");
    setNumber("");
  };

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor={nameInputId} className={styles.form__label}>
          Name
          <input
            className={styles.form__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={handleName}
            id={nameInputId}
          />
        </label>
        <label htmlFor={numberInputId} className={styles.form__label}>
          Number
          <input
            className={styles.form__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={number}
            onChange={handleNumber}
            id={numberInputId}
          />
        </label>
        <Button
          type="submit"
          /* className={styles.form__btn} */
          variant="contained"
          color="primary"
        >
          Save contact
        </Button>
      </form>
    </div>
  );
}
