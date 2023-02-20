import Card from '../../components/Card'
import { useQuery } from '@apollo/client'
import { FIND_MANY_ROUTE1 } from '../../gql/tours/query'
import LoadingIndicator from '../../components/LoadingIndicator'
const nowDate = new Date()

const Ways = () => {
  const { data, loading } = useQuery(FIND_MANY_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: {
      where: { date: { gt: nowDate.toISOString() } },
    },
  })

  if (loading) return <LoadingIndicator />

  const GetDate = (date) => new Date(date).getTime()

  const routes = [
    ...data.findManyRoute
      .filter((item) => item.visible)
      .sort((a, b) => {
        if (GetDate(a.date) > GetDate(b.date)) return 1
        if (GetDate(a.date) < GetDate(b.date)) return -1
        return 0
      }),
  ]

  return (
    <div className='cards'>
      {routes.map((item) => (
        <Card key={item.id} tour={item} />
      ))}
    </div>
  )
}

export default Ways
