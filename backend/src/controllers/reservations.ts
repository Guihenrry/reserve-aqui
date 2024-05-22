import { Request, Response } from 'express'

import supabase from '../supabase'

export async function create(req: Request, res: Response) {
  const accessToken = req.headers['authorization']?.split('Bearer ')[1]
  const { data: userData, error: userError } = await supabase.auth.getUser(
    accessToken
  )

  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        space_id: req.body.space_id,
        user_id: userData?.user?.id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        date: req.body.date,
      },
    ])
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

export async function list(req: Request, res: Response) {
  const accessToken = req.headers['authorization']?.split('Bearer ')[1]
  const { data: userData, error: userError } = await supabase.auth.getUser(
    accessToken
  )

  let { data, error } = await supabase
    .from('reservations')
    .select('*, spaces (name, id) ')
    .eq('user_id', userData?.user?.id)

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}

export async function cancel(req: Request, res: Response) {
  const accessToken = req.headers['authorization']?.split('Bearer ')[1]
  const { data: userData, error: userError } = await supabase.auth.getUser(
    accessToken
  )

  const { data, error } = await supabase
    .from('reservations')
    .update({ canceled: true })
    .eq('id', req.params.id)
    .eq('user_id', userData?.user?.id)
    .select()

  if (error) {
    return res.status(401).json({ error: error })
  }

  return res.json(data)
}
