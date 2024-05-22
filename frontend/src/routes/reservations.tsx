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
import { useReservationsQuery } from '@/queries/useReservationsQuery'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import api from '@/services/api'
import toast from 'react-hot-toast'
import queryClient from '@/services/queryClient'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export function Reservations() {
  const { token } = useAuth()
  const { data, isLoading } = useReservationsQuery({ token })

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
            <CardTitle>Minhas reservas</CardTitle>
            <CardDescription>
              Gerenciar e visualizar suas reservas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead>Hora de entrada</TableHead>
                  <TableHead>Hora de saída</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <TableBody className="h-20">
                  {Array.from({ length: 4 }).map((_, key) => (
                    <TableRow key={key}>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-100 h-6" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {!!data?.length &&
                    data?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <Link to={`/spaces/${item.spaces.id}`}>
                            {item.spaces.name}
                          </Link>
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
                        <TableCell>
                          {!item.canceled && (
                            <Button
                              onClick={() => handleClickCancel(item.id)}
                              aria-haspopup="true"
                              variant="destructive"
                            >
                              Cancelar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}

                  {!data?.length && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <p className="text-lg font-medium w-full h-40 flex items-center justify-center">
                          Sem resultados
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
