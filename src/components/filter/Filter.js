import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as contactActions from "../../redux/contacts/contacts-actions";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import styles from "../filter/Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(contactSelectors.getFilter);
  const onChange = (e) =>
    dispatch(
      contactActions.filterByName(e.target.value)
    ); /* also useCallback can be used here*/
  return (
    <div className={styles.filter}>
      <h3 className={styles.filter_title}>Find contacts by name</h3>
      <label>
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
