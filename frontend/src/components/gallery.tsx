interface Image {
  src: string
  alt: string
}

interface GalleryProps {
  images: Image[]
}

export function Gallery({ images }: GalleryProps) {
  console.log(images)

  return (
    <div className="grid grid-cols-2 gap-5">
      {images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  )
}
