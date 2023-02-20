import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InputRange from '../../components/InputRange'
import LoadingIndicator from '../../components/LoadingIndicator'
import { FIND_UNIQUE_ROUTE1 } from '../../gql/tours/query'
import checkRoomIsBooked from '../../components/checkRoomIsBooked'
import TodayDate from '../../components/TodayDate'
import MainButton from '../../components/MainButton'

const Passengers = ({ history }) => {
  const [count, setCount] = useState({ adult: 0, child: 0, children: 0 })
  const [isBooked, setIsBooked] = useState(true)
  const { id } = useParams()

  const { data, loading } = useQuery(FIND_UNIQUE_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: { where: { id } },
  })

  const info = JSON.parse(localStorage.getItem('info'))
  useEffect(() => checkRoomIsBooked(data, loading, info.room, history, setIsBooked), [data, loading, info, history])

  if (loading || isBooked) return <LoadingIndicator />
  if (!data) return 'Ошибка'

  const onPlus = (w) => {
    if (count.adult + count.child >= info.max) return
    setCount({ ...count, [w]: count[w] + 1 })
  }

  const onMinus = (w) => {
    if (count[w] > 0) setCount({ ...count, [w]: count[w] - 1 })
  }

  const onSubmit = () => {
    localStorage.setItem('passengers', JSON.stringify({ ...count }))
  }
  return (
    <div className='passengers'>
      <h1>Укажите колличество пассажиров</h1>
      <div className='flex-sb'>
        <div>
          <h2>Пассажиры</h2>
          <InputRange value={count.adult} type='adult' onPlus={onPlus} onMinus={onMinus} title='Взрослые и дети с 12 лет' />
          <InputRange value={count.child} type='child' onPlus={onPlus} onMinus={onMinus} title='Дети от 2 до 12 лет' />
          <InputRange
            value={count.children}
            onPlus={() => setCount({ ...count, children: count.children + 1 })}
            onMinus={() => count.children !== 0 && setCount({ ...count, children: count.children - 1 })}
            title='Дети без предоставления места'
          />
          <Link onClick={onSubmit} to={`/route/buy/${id}`}>
            <MainButton title='Следующий шаг' />
          </Link>
        </div>
        <div className='desc-list'>
          <h2>Информация</h2>
          <div className='flex-sb'>
            <p>Маршрут:</p>
            <b>{info.route.join(' → ')}</b>
          </div>
          <div className='flex-sb'>
            <p>Дата отплытия:</p>
            <b>{TodayDate(new Date(info.date))}</b>
          </div>
          <div className='flex-sb'>
            <p>Длительность:</p>
            <b>{info.duration + 'ч.'}</b>
          </div>
          <div className='flex-sb'>
            <p>Судно:</p>
            <b>{info.route.ship === 1 ? 'МИХАИЛ СВЕТЛОВ' : 'ДЕМЬЯН БЕДНЫЙ'}</b>
          </div>
          <div className='flex-sb'>
            <p>Палуба и каюта:</p>
            <b>{info.deck + ',' + info.room}</b>
          </div>
          <div className='flex-sb'>
            <p>Вместимость:</p>
            <b>{info.max}</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Passengers
