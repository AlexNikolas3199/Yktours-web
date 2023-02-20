import CircleText from './CircleText'
import months from '../utils/months'
import { Link } from 'react-router-dom'
import { TeamOutlined } from '@ant-design/icons'

const Card = ({ tour, ticket }) => {
  let rightTopDiv = ticket ? (
    <>
      {ticket.passengers.length} <TeamOutlined style={{ marginLeft: 2 }} />
    </>
  ) : (
    'от ' + tour.Pricing[3] + ' ₽'
  )

  return (
    <Link to={ticket ? `/tickets/${ticket.id}` : `/route/${tour.id}`} className='card' style={{ backgroundImage: `url(${tour.image})` }}>
      <div style={styles.darkLayer}>
        <div style={styles.rightTop}>
          <div style={styles.text}>{rightTopDiv}</div>
        </div>
        <div>
          <div>
            {tour.route.map((f, index) => (
              <CircleText key={`${index}`} t={f} />
            ))}
          </div>
          {ticket && <div style={styles.text}>Каюта:{ticket.room}</div>}
        </div>
        <div style={styles.bottom}>
          <div style={styles.text}>{new Date(tour.date).getDate() + ' ' + months[new Date(tour.date).getMonth()]}</div>
          <div style={styles.text}>{tour.duration + 'ч.'}</div>
        </div>
      </div>
    </Link>
  )
}

const styles = {
  darkLayer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  rightTop: { display: 'flex', justifyContent: 'flex-end', marginBottom: 30 },
}

export default Card
