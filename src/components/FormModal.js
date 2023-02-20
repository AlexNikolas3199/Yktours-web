import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
const { Option } = Select

const FormModal = ({ info, open, data }) => {
  const [docType, setDocType] = useState('Паспорт')
  const [form] = Form.useForm()

  const visToggle = () => data.setModVis(!open)

  const { type, id } = data.formType

  const handleAdd = (v) => {
    const arr = [...data.passengers[type]]
    const food = v.food.split(',')
    arr.push({ ...v, dateOfBirth: v.dateOfBirth.toISOString(), food: food[0], foodPrice: Number(food[1]), id })
    data.setPassengers({ ...data.passengers, [type]: arr })
    data.setTotalPrice(data.totalPrice + Number(food[1]))
    visToggle()
    form.resetFields()
  }

  const onDocTypeChange = (e) => {
    form.setFieldsValue({ documentNumber: '' })
    setDocType(e)
  }

  const getLength = () => {
    if (docType === 'Паспорт') return 10
    if (docType === 'Свидетельство о рождении') return 9
    return null
  }

  const myFood = type === 'child' ? info.foodKids : type === 'children' ? [0, 0, 0, 0] : info.food
  const kids = type === 'child' || type === 'children'
  const dada = [
    { name: 'Не выбрано', value: 0 },
    { name: `Шведский стол - ${myFood[0]} ₽`, value: myFood[0] },
    { name: `Завтрак - ${myFood[1]} ₽`, value: myFood[1] },
    { name: `Обед - ${myFood[2]} ₽`, value: myFood[2] },
    { name: `Ужин - ${myFood[3]} ₽`, value: myFood[3] },
  ]
  const rules = [{ required: true }]

  return (
    <Modal title='Добавление пассажира' open={open} footer={null} onCancel={visToggle}>
      <Form form={form} onFinish={handleAdd} labelCol={{ span: 8 }}>
        <Form.Item name='surname' rules={rules} label='Фамилия'>
          <Input />
        </Form.Item>
        <Form.Item name='name' rules={rules} label='Имя'>
          <Input />
        </Form.Item>
        <Form.Item name='patronymic' rules={rules} label='Отчество'>
          <Input />
        </Form.Item>
        <Form.Item name='dateOfBirth' rules={rules} label='Дата рождения'>
          <DatePicker />
        </Form.Item>
        <Form.Item name='documentType' rules={rules} label='Документ'>
          <Select onChange={(e) => onDocTypeChange(e)} placeholder='Выберите документ'>
            {!kids && <Option value='Паспорт'>Паспорт</Option>}
            <Option value='Свидетельство о рождении'>Свидетельство о рождении</Option>
            <Option value='Заграничный паспорт'>Заграничный паспорт</Option>
            <Option value='Иностранный документ'>Иностранный документ</Option>
          </Select>
        </Form.Item>
        <Form.Item name='documentNumber' rules={rules} label='Серия, номер'>
          <Input minLength={getLength()} maxLength={getLength()} />
        </Form.Item>
        <Form.Item name='food' rules={rules} label='Питание'>
          <Select placeholder='Выберите питание'>
            {dada.map((item) => (
              <Option key={item.name} value={item.name + ',' + item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button htmlType='submit' type='primary'>
            Добавить
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
export default FormModal
