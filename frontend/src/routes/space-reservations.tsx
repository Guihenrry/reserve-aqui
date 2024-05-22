import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/hooks/useAuth'
import { format, parseISO } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import api from '@/services/api'
import toast from 'react-hot-toast'
import queryClient from '@/services/queryClient'
import { Badge } from '@/components/ui/badge'
import { useSpaceReservationsQuery } from '@/queries/useSpaceReservationsQuery'

export function SpaceReservations() {
  const { token } = useAuth()
  const { id } = useParams()
  const { data } = useSpaceReservationsQuery({ token, id })

  async function handleClickCancel(id: number) {
    try {
      await api.patch(`/reservations/${id}/cancel`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Reserva cancelada com sucesso')
      queryClient.invalidateQueries()
    } catch (error) {
      toast.error('Ocorreu um erro ao cancelar')
    }
  }

  return (
    <div>
      <Header />

      <div className="max-w-6xl flex mx-auto p-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Reservas:{' '}
              <Link to={`/spaces/${data?.space?.id}`}>{data?.space?.name}</Link>
            </CardTitle>
            <CardDescription>
              Visualizar reservas do espaço {data?.space?.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead>Hora de entrada</TableHead>
                  <TableHead>Hora de saída</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.reservations.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden md:table-cell">
                      {item.users?.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.users?.phone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(parseISO(item.date), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>{item.start_time}</TableCell>
                    <TableCell>{item.end_time}</TableCell>
                    <TableCell>
                      {item.canceled ? (
                        <Badge variant="destructive">Cancelado</Badge>
                      ) : (
                        <Badge>Reservado</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
