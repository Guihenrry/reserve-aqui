import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { token, signOut } = useAuth()

  return (
    <div>
      <header className="max-w-6xl mx-auto flex justify-between p-8">
        <Logo className="w-40" />
        {token ? (
          <Button onClick={signOut}>Sair</Button>
        ) : (
          <Button asChild>
            <Link to="/sign-in">Entrar</Link>
          </Button>
        )}
      </header>
    </div>
  )
}
