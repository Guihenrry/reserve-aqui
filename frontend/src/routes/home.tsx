import { Header } from '@/components/header'
import { Space } from '@/components/space'

export function Home() {
  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Space
          id={1}
          name="Salão de festa"
          imageAlt="Salão de festa"
          image="/placeholder.svg"
        />

        <Space
          id={2}
          name="Salão de festa"
          imageAlt="Salão de festa"
          image="/placeholder.svg"
        />

        <Space
          id={3}
          name="Salão de festa"
          imageAlt="Salão de festa"
          image="/placeholder.svg"
        />
      </main>
    </div>
  )
}
