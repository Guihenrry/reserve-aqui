import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Space, useSpacesQuery } from '@/queries/useSpacesQuery'
import { AddSpaceDialog } from '@/components/add-space-dialog'
import { DeleteSpaceDialog } from '@/components/delete-space-dialog'
import { useDeleteSpaceMutation } from '@/queries/useDeleteSpaceMutation'
import { Link } from 'react-router-dom'
import { EditSpaceDialog } from '@/components/edit-space-dialog'

export function Spaces() {
  const { data } = useSpacesQuery()
  const [toDeleteId, setToDeleteId] = useState<number | null>()
  const [spaceToEdit, setSpaceToEdit] = useState<Space | null>()
  const deleteSpaceMutation = useDeleteSpaceMutation()

  async function handleDeleteDialog() {
    if (toDeleteId) {
      await deleteSpaceMutation.mutateAsync(toDeleteId)
      setToDeleteId(null)
    }
  }

  return (
    <div>
      <Header />

      <div className="max-w-6xl flex flex-col items-end gap-4 mx-auto p-8">
        <div>
          <AddSpaceDialog />
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Espaços</CardTitle>
            <CardDescription>
              Gerenciar seus espaços e visualizar suas reservas.
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
                  <TableHead>Capacidade</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Data de criação
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((space) => (
                  <TableRow key={space.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={space.space_images[0]}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/spaces/${space.id}`}>{space.name}</Link>
                    </TableCell>
                    <TableCell>{space.capacity}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(space.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link to={`/spaces/${space.id}/reservations`}>
                              Ver reservas
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSpaceToEdit(space)}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setToDeleteId(space.id)}
                          >
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <DeleteSpaceDialog
        open={!!toDeleteId}
        onClose={() => setToDeleteId(null)}
        onSubmit={handleDeleteDialog}
        isLoading={deleteSpaceMutation.status === 'pending'}
      />

      {spaceToEdit && (
        <EditSpaceDialog
          onClose={() => setSpaceToEdit(null)}
          space={{
            id: spaceToEdit.id,
            name: spaceToEdit.name,
            capacity: spaceToEdit.capacity,
          }}
        />
      )}
    </div>
  )
}
