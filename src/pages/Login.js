import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { Form, Card as AntCard, Input, Button as AntButton, notification } from 'antd'
import { SIGN_IN, SIGN_IN_VERIFY, SIGN_UP, SIGN_UP_VERIFY } from '../gql/sign/mutation'
import { useEffect, useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import LoadingIndicator from '../components/LoadingIndicator'
import { useUser } from '../utils/hooks'

const requiredRule = {
  required: true,
  message: 'Обязательное поле',
}
const emailRule = {
  type: 'email',
  message: 'Введите правильный Email',
}

const Login = () => {
  const { user, loading: loadingUser } = useUser()

  useEffect(() => {
    if (user) window.location = '/'
  }, [user])

  const [isSignIn, setIsSignIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [token, setToken] = useState(false)

  const [sign_up, { loading: loadingUp }] = useMutation(SIGN_UP)
  const [sign, { loading }] = useMutation(SIGN_IN)

  const handleSubmitForm = (values) => {
    sign_up({
      variables: { data: { email: values.email } },
      onCompleted: (data) => {
        setToken(data?.signUp)
        setIsSignUp(true)
      },
      onError: () => {
        sign({
          variables: { data: { email: values.email } },
          onCompleted: (data) => {
            setToken(data?.signIn.token)
            setIsSignIn(true)
          },
          onError: (message) => {
            console.log(message)
          },
        })
      },
    })
  }

  const goTo = () => {
    let url = new URL(document.location).searchParams.get('url')
    url ? (window.location = url) : (window.location = '/')
  }

  const [sign_in_verify] = useMutation(SIGN_IN_VERIFY, {
    onCompleted: (data) => {
      localStorage.setItem('token', data?.signInVerify?.token)
      goTo()
    },
  })

  const [sign_up_verify] = useMutation(SIGN_UP_VERIFY, {
    onCompleted: (data) => {
      localStorage.setItem('token', data?.signUpVerify?.token)
      goTo()
    },
  })

  const verify = (values) => {
    const params = {
      variables: { token, code: values.code },
      onError: () => {
        notification.open({
          message: 'Неверный код',
          description: 'Код неверен. Попробуйте еще раз.',
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        })
      },
    }
    if (isSignIn) sign_in_verify(params)
    if (isSignUp) sign_up_verify(params)
  }

  if (loadingUser) return <LoadingIndicator />
  if (isSignIn || isSignUp)
    return (
      <Wrapper>
        <Card title='Вход'>
          <Form onFinish={verify} layout='vertical'>
            <Form.Item label='Код' name='code' rules={[requiredRule]}>
              <Input placeholder='Введите код из email...' />
            </Form.Item>
            <Button loading={loading || loadingUp} type='primary' htmlType='submit'>
              Войти
            </Button>
          </Form>
        </Card>
      </Wrapper>
    )

  return (
    <Wrapper>
      <Card title='Вход'>
        <Form onFinish={handleSubmitForm} layout='vertical'>
          <Form.Item label='Email' name='email' rules={[requiredRule, emailRule]}>
            <Input placeholder='Введите электронный адрес...' />
          </Form.Item>
          <Button loading={loading || loadingUp} type='primary' htmlType='submit'>
            Получить код
          </Button>
        </Form>
      </Card>
    </Wrapper>
  )
}

const Card = styled(AntCard)`
  width: 400px;

  @media only screen and (max-width: 420px) {
    width: 95%;
  }
`

const Button = styled(AntButton)``

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px 10px;

  @media only screen and (max-width: 420px) {
    justify-content: flex-start;
    padding-top: 30px;
  }
`

export default Login
