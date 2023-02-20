import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/antd.min.css'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import client from './utils/apollo'
import locale from 'antd/es/locale/ru_RU'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
)
