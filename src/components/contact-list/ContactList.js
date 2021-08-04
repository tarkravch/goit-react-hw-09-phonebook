import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import contactOperations from "../../redux/contacts/contacts-operations";
import contactSelectors from "../../redux/contacts/contacts-selectors";

import styles from "../contact-list/ContactList.module.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import Modal from "../Modal/Modal";
import EditForm from "../edit-form/EditForm";

export let nameToChange = "";
export let numberToChange = "";
export let idOfContactToChange = "";

export default function ContactList() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const contacts = useSelector(contactSelectors.getVisibleContacts);

  const toggleModal = useCallback((actualId, oldName, oldNumber) => {
    setShowModal((prevShowModal) => !prevShowModal);
    nameToChange = oldName;
    numberToChange = oldNumber;
    idOfContactToChange = actualId;
  }, []);

  const onDeleteContact = (id) => dispatch(contactOperations.deleteContact(id));

  const sortedContacts = contacts.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className={styles.contacts__block}>
        <ul id="contacts" className={styles.list}>
          {sortedContacts.map((itemName) => (
            <li key={itemName.id} className={styles.list__item}>
              <div className={styles.list__spec}>
                <span className={styles.list__name}>{itemName.name}</span>
                <span className={styles.list__number}>
                  {itemName.number}
                </span>{" "}
              </div>
              <div className={styles.btn__block}>
                <Button
                  onClick={() =>
                    toggleModal(itemName.id, itemName.name, itemName.number)
                  }
                  /* className={styles.list__btn} */
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteContact(itemName.id)}
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  startIcon={<DeleteIcon />}
                  // className={styles.list__btn}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <EditForm onSave={toggleModal} />
        </Modal>
      )}
    </>
  );
}
