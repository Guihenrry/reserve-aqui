import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export type Space = {
  id: number
  name: string
  capacity: number
  created_at: string
  space_images: Array<string>
}

async function getSpaces() {
  const response = await api.get('/spaces')
  return response.data
}

export const QUERY_KEY = ['spaces']

export function useSpacesQuery() {
  return useQuery<Space[]>({
    queryKey: QUERY_KEY,
    queryFn: getSpaces,
  })
}
