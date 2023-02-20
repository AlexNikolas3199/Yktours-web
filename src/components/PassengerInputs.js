import { Button, Popconfirm } from 'antd'
import { useState } from 'react'

const PassengerInputs = ({ title, type, options }) => {
  const [open, setOpen] = useState(false)
  const { persons, openForm, setPassengers, setTotalPrice, totalPrice } = options
  const passengers = JSON.parse(localStorage.getItem('passengers'))
  if (!passengers[type]) return
  const isChild = type === 'child' || type === 'children'

  const handleOk = (id, food) => {
    const arr = persons[type].filter((item) => item.id !== id)
    setPassengers({ ...persons, [type]: arr })
    setTotalPrice(totalPrice - food)
    setOpen(false)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div className='flex-sb'>
        <h4 style={styles.inputTitle}>{title}</h4>
        {passengers[type] !== persons[type].length && (
          <Button onClick={() => openForm({ type, id: persons[type].length })} type='primary' style={{ marginLeft: 5 }} ghost>
            Добавить {isChild ? 'ребёнка' : 'пассажира'}
          </Button>
        )}
      </div>
      <div>
        {persons[type].map((item) => (
          <div style={{ marginBottom: 10 }} key={item.id}>
            <Popconfirm title='Удалить пассажира?' open={open} onConfirm={() => handleOk(item.id, item.foodPrice)} onCancel={() => setOpen(false)}>
              <Button type='primary' ghost onClick={() => setOpen(true)}>
                {item.surname} {item.name} {item?.patronymic}
              </Button>
            </Popconfirm>
          </div>
        ))}
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
export default PassengerInputs
