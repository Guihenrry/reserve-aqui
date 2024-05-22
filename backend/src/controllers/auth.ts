import { Request, Response } from 'express'
import supabase from '../supabase'

export async function getUser(req: Request, res: Response) {
  const accessToken = req.headers['authorization']?.split('Bearer ')[1]
  const { data: userData, error: userError } = await supabase.auth.getUser(
    accessToken
  )

  if (userError) {
    return res
      .status(userError?.status || 401)
      .json({ message: userError?.message })
  }

  const response = await supabase
    .from('users')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  return res.json(response.data)
}

export async function authVerify(req: Request, res: Response) {
  const accessToken = req.headers['authorization']?.split('Bearer ')[1]
  const { error } = await supabase.auth.getUser(accessToken)

  if (error) {
    return res.status(error?.status || 401).json({ message: error?.message })
  }

  return res.status(204).send()
}

export async function signIn(req: Request, res: Response) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })

  if (error) {
    return res.status(error?.status || 401).json({ message: error?.message })
  }

  return res.json(data)
}

export async function signUp(req: Request, res: Response) {
  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  })

  if (error) {
    return res.status(error?.status || 401).json({ message: error?.message })
  }

  await supabase
    .from('users')
    .insert([{ id: data.user?.id, name: req.body.name, phone: req.body.phone }])
    .select()

  return res.json(data)
}
