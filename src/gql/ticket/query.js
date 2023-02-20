import { gql } from '@apollo/client'

export const FIND_UNIQUE_TICKET = gql`
  query ($where: TicketWhereUniqueInput!) {
    findUniqueTicket(where: $where) {
      id
      orderId
      amount
      food
      foodEng
      room
      postId
      passengers {
        id
        name
        surname
        patronymic
        dateOfBirth
        documentType
        documentNumber
        food
      }
      route {
        id
        image
        duration
        date
        route
      }
    }
  }
`
export const FIND_MANY_TICKET = gql`
  query ($where: TicketWhereInput) {
    findManyTicket(where: $where) {
      id
      room
      passengers {
        id
      }
      route {
        id
        image
        duration
        date
        route
      }
    }
  }
`
