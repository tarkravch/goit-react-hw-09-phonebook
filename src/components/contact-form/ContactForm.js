import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactOperations from "../../redux/contacts/contacts-operations";
import shortid from "shortid";
import styles from "../contact-form/ContactForm.module.css";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";

export default function ContactForm() {
  const dispatch = useDispatch();
  /* const [name, setName] = useState("");
  const [number, setNumber] = useState(""); */
  const initialState = {
    name: "",
    number: "",
  };
  const [phoneContact, setPhoneContact] = useState(initialState);
  const { name, number } = phoneContact;

  const contacts = useSelector(contactSelectors.getVisibleContacts);
  /*  componentDidMount() {
    this.props.fetchContact();
  } */
  useEffect(() => {
    dispatch(contactOperations.fetchContact());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setPhoneContact((prev) => ({ ...prev, [name]: value }));
  };
  /* const handleName = (event) => {
    const { value } = event.currentTarget;
    setName(value);
  };
  const handleNumber = (event) => {
    const { value } = event.currentTarget;
    setNumber(value);
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    contacts.find((contact) => contact.name === name)
      ? alert(`Name ${name} is already in the contacts`)
      : contacts.find((contact) => contact.number === number)
      ? alert(`Number ${number} is already in the contacts`)
      : dispatch(contactOperations.addContact({ name, number }));
    reset();
  };

  const reset = () => {
    /* setName("");
    setNumber(""); */
    setPhoneContact({ ...initialState });
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
            pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
            title="?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
            required
            value={name}
            onChange={handleChange}
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
            title="?????????? ???????????????? ???????????? ???????????????? ???????? ?? ?????????? ?????????????????? ??????????????, ????????, ?????????????? ???????????? ?? ?????????? ???????????????????? ?? +"
            required
            value={number}
            onChange={handleChange}
            id={numberInputId}
          />
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary" /* className={styles.form__btn} */
        >
          Add contact
        </Button>
      </form>
    </div>
  );
}
