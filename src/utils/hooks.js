import { useQuery } from '@apollo/client'
import { ME } from '../gql/sign/query'

export const useUser = () => {
  const { data, loading, error } = useQuery(ME)
  const user = data ? data.me : null
  return {
    loading,
    error,
    user,
  }
}
