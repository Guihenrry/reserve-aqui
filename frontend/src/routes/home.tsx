import { Header } from '@/components/header'
import { Space } from '@/components/space'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'

import { useSpacesQuery } from '@/queries/useSpacesQuery'

export function Home() {
  const { data, isLoading } = useSpacesQuery()

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <AspectRatio ratio={1 / 1}>
                <Skeleton className="h-full w-full rounded-xl" />
              </AspectRatio>
              <Skeleton className="h-[24px]" />
            </div>
          ))}
        {data?.map((space) => (
          <Space
            key={space.id}
            id={space.id}
            name={space.name}
            imageAlt={space.name}
            image={space.space_images[0]}
          />
        ))}
      </main>
    </div>
  )
}
