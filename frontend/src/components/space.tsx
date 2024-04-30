import { Link } from 'react-router-dom'

interface SpaceProps {
  id: number
  name: string
  image: string
  imageAlt: string
}

export function Space({ id, image, imageAlt, name }: SpaceProps) {
  return (
    <Link to={`/spaces/${id}`} className="flex flex-col gap-3">
      <img src={image} alt={imageAlt} />
      <h3>{name}</h3>
    </Link>
  )
}
