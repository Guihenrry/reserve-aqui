import { Request, Response } from 'express'
import { eachHourOfInterval, setHours } from 'date-fns'

import supabase from '../supabase'

export async function create(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .insert([
      {
        name: req.body.name,
        capacity: req.body.capacity,
        open_at: req.body.open_at,
        closes_at: req.body.closes_at,
      },
    ])
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

export async function list(req: Request, res: Response) {
  let { data, error } = await supabase.from('spaces').select('*')

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

export async function show(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
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

export async function getHours(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .eq('id', req.params.id)
    .single()

  const start = setHours(new Date(), data.open_at.split(':')[0])
  const end = setHours(new Date(), data.closes_at.split(':')[0])

  const result = eachHourOfInterval({ start, end })

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(result)
}
