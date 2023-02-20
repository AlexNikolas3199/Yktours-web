import { useQuery } from '@apollo/client'
import { Tabs, Button, Modal } from 'antd'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BotPlace from '../../components/BotPlace'
import ChooseRoomModal from '../../components/ChooseRoomModal'
import LegendWrap from '../../components/Legend'
import LoadingIndicator from '../../components/LoadingIndicator'
import MidPlace from '../../components/MidPlace'
import { FIND_UNIQUE_ROUTE1 } from '../../gql/tours/query'
import { rooms } from '../../utils/rooms'

const ChooseRoom = () => {
  const [modalParams, setModalParams] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const modalToggle = () => setIsModalVisible(!isModalVisible)
  const { id } = useParams()

  const { data, loading } = useQuery(FIND_UNIQUE_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: { where: { id } },
  })

  if (loading) return <LoadingIndicator />
  if (!data) return 'Ошибка'

  const routeTur = data?.findUniqueRoute

  const onTapHandler = (room, color, deck) => {
    if (!loading) {
      setModalParams({ room, color, deck })
      modalToggle()
    }
  }
  const onChoose = () => {
    const cabin = rooms.find((item) => item.color === modalParams.color)
    localStorage.setItem('info', JSON.stringify({ ...modalParams, ...routeTur, ...cabin }))
  }

  return (
    <div className='container'>
      <Tabs
        type='card'
        centered
        items={[
          {
            key: '1',
            label: 'Нижняя палуба',
            children: (
              <LegendWrap routeTur={routeTur}>
                <BotPlace onTap={onTapHandler} routeTur={routeTur} />
              </LegendWrap>
            ),
          },
          {
            key: '2',
            label: 'Средняя палуба',
            children: (
              <LegendWrap routeTur={routeTur}>
                <MidPlace onTap={onTapHandler} routeTur={routeTur} />
              </LegendWrap>
            ),
          },
        ]}
      />
      <Modal
        title={'Каюта ' + modalParams?.room}
        open={isModalVisible}
        onCancel={modalToggle}
        width={900}
        footer={[
          <Link key='1' onClick={onChoose} to={`/route/passengers/${id}`}>
            <Button type='primary'>Выбрать</Button>
          </Link>,
        ]}
      >
        {isModalVisible && <ChooseRoomModal data={modalParams} routeTur={routeTur} />}
      </Modal>
    </div>
  )
}

export default ChooseRoom
