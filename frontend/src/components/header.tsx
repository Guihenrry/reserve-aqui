import { Link } from 'react-router-dom'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { MenuIcon } from 'lucide-react'

export function Header() {
  const { isLoggedIn, signOut, user } = useAuth()

  return (
    <header className="max-w-6xl mx-auto flex justify-between p-8">
      <Link to="/">
        <Logo className="w-40" />
      </Link>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="overflow-hidden">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/reservations">Minhas reservas</Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link to="/spaces">Gestão de espaços</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link to="/sign-in">Entrar</Link>
        </Button>
      )}
    </header>
  )
}
