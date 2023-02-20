import React, { useState, useRef } from 'react'
import { THEME } from '../utils/theme'
import { useMutation } from '@apollo/client'
import { DELETE_ONE_TICKET, REFUND_INPUT } from '../gql/ticket/mutation'
import { Button, Input, Modal, notification } from 'antd'
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

const CodeInputModal = ({ ticket }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [code, setCode] = useState(0)
  const [inCode, setInCode] = useState(0)
  const [func, setFunc] = useState(() => {})
  const [isLoading, setIsLoading] = useState(false)
  const toggleModal = () => setModalVisible(!modalVisible)
  const inputEl = useRef(null)

  //удаление билета
  const [deleteTicket] = useMutation(DELETE_ONE_TICKET)

  //возврат билета
  const [refund] = useMutation(REFUND_INPUT, {
    onCompleted: (data) => {
      if (data.refundInput.errorCode === '0') {
        Modal.confirm({
          title: 'Билет возвращен.',
          icon: <CheckCircleOutlined />,
          content: 'Вы успешно произвели возврат. Денежные средства поступят на карту в течение 7-14 дней.',
          onOk: () => (window.location = '/tickets'),
          okText: 'Перейти к билетам',
          cancelButtonProps: { style: { display: 'none' } },
        })
        deleteTicket({ variables: { where: { orderId: ticket?.orderId } } })
      } else {
        setIsLoading(false)
        notification.open({
          message: 'Ошибка',
          description: 'Что-то пошло не так. Попробуйте позже.',
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        })
      }
    },
  })

  //Когда возврат подтвержден
  const onSubmit = () => {
    if (code === Number(inCode)) {
      toggleModal()
      setIsLoading(true)
      func()
    } else {
      setIsLoading(false)
      notification.open({
        message: 'Неверный код',
        description: 'Код неверен. Попробуйте еще раз.',
        icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      })
    }
  }

  //вернуть процент
  const doChoose = (procent) =>
    Modal.confirm({
      title: 'Вернуть билет.',
      icon: <ExclamationCircleOutlined />,
      content:
        procent > 0
          ? `Вам вернется ${(ticket?.amount * procent) / 100} ₽. Вы уверены что хотите вернуть билет?`
          : 'Вы уверены что хотите вернуть билет?',
      onOk: () => {
        setCode(Math.round(Math.random() * 10000))
        setModalVisible(true)
        setTimeout(() => inputEl.current.focus(), 500)
        let func
        if (procent > 0) {
          func = () =>
            refund({
              variables: {
                data: {
                  orderId: ticket?.orderId,
                  amount: ticket?.amount * procent,
                },
              },
            })
        } else
          func = () =>
            deleteTicket({
              variables: { where: { orderId: ticket?.orderId } },
            })

        setFunc(() => func)
      },
      okText: 'Вернуть билет',
    })

  const onReturnTicket = () => {
    const days = Math.floor((new Date(ticket?.route.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    // const days = 12;
    if (days > 15) doChoose(1)
    if (days > 10 && days <= 15) doChoose(0.8)
    if (days > 5 && days <= 10) doChoose(0.4)
    if (days === 5) doChoose(0.2)
    if (days < 5) doChoose(0)
  }

  return (
    <>
      {Date.now() < Date.parse(ticket?.route?.date) && (
        <div style={styles.dangerZone}>
          <Button loading={isLoading} onClick={onReturnTicket} style={{ paddingVertical: 15, color: 'red' }}>
            Вернуть билет
          </Button>
        </div>
      )}
      <Modal title='Возврат билета' open={modalVisible} onOk={onSubmit} onCancel={toggleModal}>
        <div>
          <div style={styles.modText}>Введите код: {code}</div>
          <Input onChange={(p) => setInCode(p.target.value)} style={styles.input} ref={inputEl} />
        </div>
      </Modal>
    </>
  )
}
const styles = {
  modText: {
    fontSize: 18,
    padding: 15,
  },
  dangerZone: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  input: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: THEME.GREY_COLOR,
    marginHorizontal: 15,
  },
}
export default CodeInputModal
