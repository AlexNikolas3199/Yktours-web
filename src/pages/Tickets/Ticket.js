import { useLazyQuery, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import CodeInputModal from '../../components/CodeInputModal'
import LoadingIndicator from '../../components/LoadingIndicator'
import TodayDate from '../../components/TodayDate'
import { ME } from '../../gql/sign/query'
import { FIND_UNIQUE_TICKET } from '../../gql/ticket/query'

const Ticket = () => {
  const { id } = useParams()
  const [getTicket, { data, loading }] = useLazyQuery(FIND_UNIQUE_TICKET, {
    fetchPolicy: 'network-only',
    variables: { where: { id } },
  })

  const { data: user, loading: loadingMe } = useQuery(ME, {
    fetchPolicy: 'network-only',
    onCompleted: () => getTicket(),
  })

  if (loading || loadingMe) return <LoadingIndicator />
  if (!user) window.location = `/login?url=${window.location.href}`
  if (!data) return 'Ошибка'

  const ticket = data?.findUniqueTicket
  const tour = ticket.route

  return (
    <div className='description'>
      <div>
        <img src={tour.image} alt='' />
        <div className='text'>
          <div className='desc-list'>
            <h2>Информация</h2>
            <div className='flex-sb'>
              <p>Маршрут:</p>
              <b>{tour.route.join(' → ')}</b>
            </div>
            <div className='flex-sb'>
              <p>Дата отплытия:</p>
              <b>{TodayDate(new Date(tour.date))}</b>
            </div>
            <div className='flex-sb'>
              <p>Длительность:</p>
              <b>{tour.duration + 'ч.'}</b>
            </div>
            <div className='flex-sb'>
              <p>Судно:</p>
              <b>{tour.route.ship === 1 ? 'МИХАИЛ СВЕТЛОВ' : 'ДЕМЬЯН БЕДНЫЙ'}</b>
            </div>
            <div className='flex-sb'>
              <p>Каюта:</p>
              <b>{ticket.room}</b>
            </div>
            <div>
              <p style={{ marginBottom: 7.5 }}>Пассажиры:</p>
              {ticket.passengers.map((item) => (
                <div key={item.id} className='passenger'>
                  <div className='flex-sb'>
                    ФИО:
                    <span>
                      {item.surname} {item.name} {item.patronymic}
                    </span>
                  </div>
                  <div className='flex-sb'>
                    Дата рождения: <span>{TodayDate(new Date(item.dateOfBirth), true)}</span>
                  </div>
                  <div className='flex-sb'>
                    {item.documentType + ': '}
                    <span>{item.documentNumber}</span>
                  </div>
                  <div className='flex-sb'>
                    Питание: <span>{item.food}</span>
                  </div>
                </div>
              ))}
            </div>
            <CodeInputModal ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
