import { useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator'
import MainButton from '../../components/MainButton'
import TodayDate from '../../components/TodayDate'
import { FIND_UNIQUE_ROUTE } from '../../gql/tours/query'

const Description = () => {
  const { id } = useParams()
  const { data, loading } = useQuery(FIND_UNIQUE_ROUTE, {
    fetchPolicy: 'network-only',
    variables: { where: { id } },
  })

  if (loading) return <LoadingIndicator />
  const tour = data?.findUniqueRoute

  return (
    <div className='description'>
      <div>
        <img src={tour.image} alt='' />
        <div className='text'>
          <div>
            <p>
              Маршрут: <b>{tour.route.join(' → ')}</b>
            </p>
            <p>
              Судно: <b>{tour.ship === 1 ? 'МИХАИЛ СВЕТЛОВ' : 'ДЕМЬЯН БЕДНЫЙ'}</b>
            </p>
            <p>
              Дата отплытия: <b>{TodayDate(new Date(tour.date))}</b>
            </p>
            <p>
              Длительность: <b>{tour.duration + 'ч.'}</b>
            </p>
            <Link to={`/route/choose/${id}`}>
              <MainButton title='Выбрать' />
            </Link>
          </div>
        </div>
      </div>
      <div className='desc'>
        <h2>Описание</h2>
        <p>{tour.Desc}</p>
      </div>
    </div>
  )
}

export default Description
