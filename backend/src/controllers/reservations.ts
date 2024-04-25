import { Request, Response } from 'express'

import supabase from '../supabase'

export async function create(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        space_id: req.body.space_id,
        user_id: req.body.user_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
    ])
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

export async function list(req: Request, res: Response) {
  let { data, error } = await supabase.from('reservations').select('*')

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}


export async function cancel(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('reservations')
    .update({ canceled: true })
    .eq('id', req.params.id)
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}