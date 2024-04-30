import { DatePicker } from '@/components/date-picker'
import { Gallery } from '@/components/gallery'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export function SpaceDetail() {
  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl mb-8">Salão de festa</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <Gallery
            images={[
              {
                src: '/placeholder.svg',
                alt: 'Imagem de salão de festa',
              },
              {
                src: '/placeholder.svg',
                alt: 'Imagem de salão de festa',
              },
              {
                src: '/placeholder.svg',
                alt: 'Imagem de salão de festa',
              },
              {
                src: '/placeholder.svg',
                alt: 'Imagem de salão de festa',
              },
            ]}
          />

          <div>
            <div className="flex justify-between mb-4">
              <span>R$100 Hora</span>
              <span>12 pessoas</span>
            </div>

            <DatePicker />

            <h3 className="mb-4 mt-4">Selecionar horários</h3>
            <div className="mb-8 flex gap-2">
              <Button variant="outline">8:00</Button>
              <Button variant="outline">9:00</Button>
              <Button variant="outline">10:00</Button>
              <Button variant="outline">12:00</Button>
              <Button variant="outline">12:00</Button>
            </div>
            <Button size="lg" className="w-full mb-4">
              Reservar
            </Button>
            <div className="flex justify-between">
              <span>Total</span>
              <span>R$200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
