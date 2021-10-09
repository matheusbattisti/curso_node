import styles from './Input.module.css'

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

export default Input
