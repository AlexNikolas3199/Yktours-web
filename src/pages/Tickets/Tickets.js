import Card from '../../components/Card'
import { useLazyQuery, useQuery } from '@apollo/client'
import LoadingIndicator from '../../components/LoadingIndicator'
import { FIND_MANY_TICKET } from '../../gql/ticket/query'
import { ME } from '../../gql/sign/query'
import { useState } from 'react'

const Tickets = () => {
  const [email, setEmail] = useState(null)

  const [getTickets, { data, loading }] = useLazyQuery(FIND_MANY_TICKET, {
    fetchPolicy: 'network-only',
    variables: { where: { user: { email: { in: email } } } },
  })

  const { data: user, loading: loadingMe } = useQuery(ME, {
    fetchPolicy: 'network-only',
    onCompleted: ({ me }) => {
      setEmail(me?.email)
      getTickets()
    },
  })

  if (loading || loadingMe) return <LoadingIndicator />
  if (!user) window.location = `/login?url=${window.location.href}`

  return (
    <div className='cards'>
      {data.findManyTicket.map((item) => (
        <Card key={item.id} tour={item.route} ticket={item} />
      ))}
      {!data.findManyTicket[0] && <div>Нет билетов.</div>}
    </div>
  )
}

export default Tickets
