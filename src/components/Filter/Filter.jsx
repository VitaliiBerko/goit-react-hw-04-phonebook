import PropTypes from 'prop-types';
import s from "./filter.module.css"
import { nanoid } from 'nanoid';

export const Filter = ({ value, onChange }) => {
    const filterInputId = nanoid()
  return (
    <div className={s.filter}>
      <label htmlFor={filterInputId} className={s.title}>Find contacts by name</label>
      <input className={s.input} type="text" name="filter" value={value} onChange={onChange} id={filterInputId} />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
