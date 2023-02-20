const circleImg = require('../img/circle.png')

const CircleText = ({ t }) => {
  const styles = {
    flex: { display: 'flex' },
    circleWrapper: { marginRight: 8 },
    circle: {
      height: 8,
      width: 8,
    },
    text: {
      fontWeight: '500',
      color: '#FFFFFF',
    },
  }
  return (
    <div style={styles.flex}>
      <div style={styles.circleWrapper}>
        <img src={circleImg} style={styles.circle} alt='' />
      </div>
      <div style={styles.text}>{t}</div>
    </div>
  )
}

export default CircleText
