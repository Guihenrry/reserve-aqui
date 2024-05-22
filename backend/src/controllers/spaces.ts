import { Request, Response } from 'express'
import { eachHourOfInterval, setHours, format } from 'date-fns'
import { decode } from 'base64-arraybuffer'

import supabase from '../supabase'
import { any } from 'zod'

function getSupabaseImageUrl(image: string) {
  const { data } = supabase.storage.from('images').getPublicUrl(image)
  return data.publicUrl
}

function generateRandomFileName(file: Express.Multer.File) {
  const fileExt = file.originalname.split('.').pop()
  const randomNumber = Math.random().toString().replace('0.', '')
  const fileName = `${randomNumber}.${fileExt}`
  return fileName
}

async function uploadFile(file: Express.Multer.File) {
  const fileName = generateRandomFileName(file)
  const fileBase64 = decode(file.buffer.toString('base64'))
  await supabase.storage.from('images').upload(fileName, fileBase64)
  return fileName
}

export async function create(req: Request, res: Response) {
  if (Array.isArray(req.files)) {
    const { data, error } = await supabase
      .from('spaces')
      .insert([
        {
          name: req.body.name,
          capacity: req.body.capacity,
          price: req.body.price,
          open_at: req.body.open_at,
          closes_at: req.body.closes_at,
        },
      ])
      .select()

    if (data?.length) {
      const spaceId = data[0].id
      const images = await Promise.all(
        req.files.map((file) => uploadFile(file))
      )
      await supabase
        .from('space_images')
        .insert(
          images.map((filename) => ({
            space_id: spaceId,
            filename,
          }))
        )
        .select()

      return res.json(data)
    }

    return res.status(401).json({ error: error })
  } else {
    return res.status(400).json({ message: 'images is required' })
  }
}

export async function list(req: Request, res: Response) {
  let { data, error } = await supabase
    .from('spaces')
    .select(`*, space_images (filename)`)

  if (error || !data) {
    return res.status(401).json({ error: error })
  }

  return res.json(
    data.map((item) => ({
      ...item,
      space_images: item.space_images.map((image: any) =>
        getSupabaseImageUrl(image.filename)
      ),
    }))
  )
}

export async function show(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .select(`*, space_images (filename)`)
    .eq('id', req.params.id)
    .single()

  if (error || !data) {
    return res.status(401).json({ error: error })
  }

  return res.json({
    ...data,
    space_images: data.space_images.map((image: any) =>
      getSupabaseImageUrl(image.filename)
    ),
  })
}

export async function remove(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .delete()
    .eq('id', req.params.id)

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.status(204).send()
}

export async function update(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .update({ name: req.body.name, capacity: req.body.capacity })
    .eq('id', req.params.id)
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

type GetReservedHoursParams = {
  date: string
  space_id: string
}

async function getReservedHours({ date, space_id }: GetReservedHoursParams) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('date', date)
    .eq('space_id', space_id)
    .eq('canceled', false)

  return data?.flatMap((item) => {
    const currentDate = new Date(date as string)
    const start = setHours(currentDate, item.start_time.split(':')[0])
    const end = setHours(currentDate, item.end_time.split(':')[0])

    const result = eachHourOfInterval({ start, end }).map((hour) =>
      format(new Date(hour), 'HH:mm')
    )

    result.pop()

    return result
  })
}

export async function getHours(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .eq('id', req.params.id)
    .single()

  const reservedHours = await getReservedHours({
    date: req.query.date as string,
    space_id: req.params.id,
  })

  const date = new Date(req.query.date as string)
  const start = setHours(date, data.open_at.split(':')[0])
  const end = setHours(date, data.closes_at.split(':')[0])

  const result = eachHourOfInterval({ start, end }).map((hour) => {
    const hourFormatted = format(new Date(hour), 'HH:mm')

    return {
      hour: hourFormatted,
      available: !reservedHours?.includes(hourFormatted),
    }
  })

  result.pop()

  return res.json(result)
}

export async function getReservations(req: Request, res: Response) {
  const space = await supabase
    .from('spaces')
    .select('*')
    .eq('id', req.params.id)
    .single()

  const reservations = await supabase
    .from('reservations')
    .select('*, users(name, phone)')
    .eq('space_id', req.params.id)

  return res.json({
    space: space.data,
    reservations: reservations.data,
  })
}
