import { Button, Drawer, Popconfirm, Spin } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../utils/hooks'
import { MenuOutlined } from '@ant-design/icons'

const Header = () => {
  const [open, setOpen] = useState(false)
  const { user, loading } = useUser()
  const text = 'Вы хотите выйти из аккаунта?'

  const openToggle = () => setOpen(!open)

  const confirm = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const MainButton = () =>
    user || loading ? (
      <Popconfirm placement='bottomRight' title={text} onConfirm={confirm}>
        <div className='login-button'>{loading ? <Spin /> : user.email}</div>
      </Popconfirm>
    ) : (
      <Link className='login-button' to='/login'>
        Войти
      </Link>
    )
  return (
    <>
      <header>
        <Link className='logo' to='/'>
          <img src={require('../img/lenaturflot.png')} alt='' />
        </Link>
        {<MainButton />}
        <Button type='primary' onClick={openToggle}>
          <MenuOutlined />
        </Button>
        <nav>
          <Link to='/'>Круизы</Link>
          <Link to='/tickets'>Мои билеты</Link>
          <Link to='/payrules'>Правила оплаты</Link>
          <Link to='/refundrules'>Правила возврата</Link>
          <Link to='/contacts'>Контакты</Link>
        </nav>
        <Drawer
          onClose={openToggle}
          open={open}
          extra={
            <div onClick={openToggle}>
              <MainButton />
            </div>
          }
        >
          <nav>
            <Link onClick={openToggle} to='/'>
              Круизы
            </Link>
            <Link onClick={openToggle} to='/tickets'>
              Мои билеты
            </Link>
            <Link onClick={openToggle} to='/payrules'>
              Правила оплаты
            </Link>
            <Link onClick={openToggle} to='/refundrules'>
              Правила возврата
            </Link>
            <Link onClick={openToggle} to='/contacts'>
              Контакты
            </Link>
          </nav>
        </Drawer>
      </header>
    </>
  )
}

export default Header
