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

export function Reservations() {
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
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead>Hora de entrada</TableHead>
                  <TableHead>Hora de saída</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">Salão de festa</TableCell>
                  <TableCell className="hidden md:table-cell">
                    07/12/2023
                  </TableCell>
                  <TableCell>09:00</TableCell>
                  <TableCell>12:00</TableCell>
                  <TableCell>
                    <Button aria-haspopup="true" variant="destructive">
                      Cancelar reserva
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
