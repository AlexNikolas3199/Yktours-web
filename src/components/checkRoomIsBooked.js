import { Modal } from 'antd'

const checkRoomIsBooked = (data, loading, room, history, noBooked) => {
  if (loading || !data) return
  const tour = data?.findUniqueRoute
  const isBookedR = tour?.ticket.find((item) => item.room === `${room}`)
  const isBookedAdmin = tour?.bookedRoom.find((item) => item.room === `${room}`)
  if (isBookedR || isBookedAdmin) {
    Modal.error({
      title: 'Ошибка',
      content: 'Что-то пошло не так. Попробуйте позже.',
      onOk: () => history.replace('/'),
    })
  } else noBooked(false)
}

export default checkRoomIsBooked
