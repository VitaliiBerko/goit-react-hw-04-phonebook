import PropTypes from 'prop-types';
import s from "./contactListItem.module.css"

export const ContactListItem = ({ id, name, number, onClick }) => {
  return (
    <li className={s.item}>
      {name} : {number}
      <button
      className={s.btnDelete}
        type="button"
        onClick={() => {
          onClick(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
