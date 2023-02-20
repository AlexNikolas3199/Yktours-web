import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import './App-media.css'
import Header from './components/Header'
import ChooseRoom from './pages/Booking/ChooseRoom'
import Description from './pages/Booking/Description'
import Ways from './pages/Booking/Ways'
import Passengers from './pages/Booking/Passengers'
import PassengersData from './pages/Booking/PassengersData'
import Login from './pages/Login'
import Tickets from './pages/Tickets/Tickets'
import Ticket from './pages/Tickets/Ticket'
import PayRules from './pages/Info/PayRules'
import Refundrules from './pages/Info/Refundrules'
import Contacts from './pages/Info/Contacts'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Ways />} />
          <Route path='/route/:id' element={<Description />} />
          <Route path='/route/choose/:id' element={<ChooseRoom />} />
          <Route path='/route/passengers/:id' element={<Passengers />} />
          <Route path='/route/buy/:id' element={<PassengersData />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/tickets/:id' element={<Ticket />} />
          <Route path='/payrules' element={<PayRules />} />
          <Route path='/refundrules' element={<Refundrules />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
