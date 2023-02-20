import { gql } from '@apollo/client'

export const FIND_UNIQUE_ROUTE = gql`
  query ($where: RouteWhereUniqueInput!) {
    findUniqueRoute(where: $where) {
      id
      visible
      image
      Pricing
      duration
      date
      createdAt
      Desc
      route
      ship
    }
  }
`
export const FIND_MANY_ROUTE1 = gql`
  query ($where: RouteWhereInput) {
    findManyRoute(where: $where) {
      id
      visible
      image
      Pricing
      duration
      date
      createdAt
      Desc
      route
      ship
    }
  }
`
export const FIND_UNIQUE_ROUTE1 = gql`
  query ($where: RouteWhereUniqueInput!) {
    findUniqueRoute(where: $where) {
      id
      visible
      image
      food
      foodKids
      Pricing
      duration
      date
      createdAt
      Desc
      route
      ship
      ticket {
        room
      }
      bookedRoom {
        room
      }
    }
  }
`
