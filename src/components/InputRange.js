const InputRange = ({ title, value, type, onMinus, onPlus }) => {
  return (
    <div className='range-wrapper'>
      <h4 style={styles.inputTitle}>{title}</h4>
      <div className='range'>
        <div className='btn left' onClick={() => onMinus(type)}>
          <span>-</span>
        </div>
        <div className='value'>{value}</div>
        <div className='btn right' onClick={() => onPlus(type)}>
          <span>+</span>
        </div>
      </div>
    </div>
  )
}
const styles = {
  inputTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 5,
  },
}
export default InputRange
