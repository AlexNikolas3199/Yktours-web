import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator'
import { FIND_UNIQUE_ROUTE1 } from '../../gql/tours/query'
import checkRoomIsBooked from '../../components/checkRoomIsBooked'
import TodayDate from '../../components/TodayDate'
import PassengerInputs from '../../components/PassengerInputs'
import FormModal from '../../components/FormModal'
import { useUser } from '../../utils/hooks'
import { Button, Modal } from 'antd'
import { CREATE_ONE_PURCHASE } from '../../gql/ticket/mutation'
import { CheckCircleOutlined } from '@ant-design/icons'

const PassengersData = ({ history }) => {
  const info = JSON.parse(localStorage.getItem('info'))
  const localPass = JSON.parse(localStorage.getItem('passengers'))

  const [modVis, setModVis] = useState(false)
  const [isBooked, setIsBooked] = useState(true)
  const [totalPrice, setTotalPrice] = useState(info.Pricing[info.indx])
  const [passengers, setPassengers] = useState({ adult: [], child: [], children: [] })
  const [formType, setFormType] = useState({ type: 'adult', id: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const { user, loading: loadingUser } = useUser()

  const { data, loading } = useQuery(FIND_UNIQUE_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: { where: { id } },
  })

  const [create_purchase] = useMutation(CREATE_ONE_PURCHASE, {
    onCompleted: (data) => {
      window.open(data.createOnePurchase.url, '_blank')
      localStorage.removeItem('info')
      localStorage.removeItem('passengers')
      Modal.confirm({
        title: 'Запрос успешно отправлен!',
        icon: <CheckCircleOutlined />,
        content: 'После оплаты перейдите по вкладке ваших билетов, чтобы просмотреть информацию.',
        onOk: () => (window.location = '/tickets'),
        okText: 'Перейти к билетам',
        cancelButtonProps: { style: { display: 'none' } },
      })
    },
  })

  // вызов функции create_purchase
  const payHandler = () => {
    //создание заказа
    setIsLoading(true)
    const guys = [...passengers.adult, ...passengers.child, ...passengers.children]
    guys.forEach((item) => {
      delete item.foodPrice
      delete item.id
    })
    create_purchase({
      variables: {
        data: {
          amount: `${totalPrice * 100}`,
          ticketInfo: {
            room: `${info.room}`,
            passengers: guys,
            userId: user.id,
            routeId: id,
            purchasedIn: 'WEBSERVICE',
          },
        },
      },
    })
  }

  useEffect(() => checkRoomIsBooked(data, loading, info.room, history, setIsBooked), [data, loading, info, history])

  if (loading || isBooked || loadingUser) return <LoadingIndicator />
  if (!user) window.location = `/login?url=${window.location.href}`
  if (!data) return 'Ошибка'
  if (isBooked) return 'Каюта уже забронирована :('

  const openForm = (type) => {
    setFormType(type)
    setModVis(true)
  }

  const getBule = (type) => localPass[type] === passengers[type].length
  const disable = getBule('adult') && getBule('child') && getBule('children')
  const options = { persons: passengers, setPassengers, openForm, setTotalPrice, totalPrice }

  return (
    <div className='passengers'>
      <FormModal info={info} open={modVis} data={{ formType, setModVis, passengers, setPassengers, setTotalPrice, totalPrice }} />
      <h1>Введите данные о пассажирах</h1>
      <div className='flex-sb'>
        <div>
          <h2>Пассажиры</h2>
          <div style={{ marginBottom: 20 }}>
            <PassengerInputs options={options} type='adult' title='Взрослые и дети с 12 лет' />
            <PassengerInputs options={options} type='child' title='Дети от 2 до 12 лет' />
            <PassengerInputs options={options} type='children' title='Дети без предоставления места' />
          </div>
          <div style={{ maxWidth: 200 }}>
            <Button type='primary' onClick={payHandler} loading={isLoading} disabled={!disable}>
              Оплатить {totalPrice} ₽
            </Button>
          </div>
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

export default PassengersData
