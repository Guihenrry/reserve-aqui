import { Routes, Route } from 'react-router-dom'

import { Home } from './routes/home'
import { SignIn } from './routes/sign-in'
import { SignUp } from './routes/sign-up'
import { Reservations } from './routes/reservations'
import { Spaces } from './routes/spaces'
import { SpaceDetail } from './routes/space-detail'
import { SpaceReservations } from './routes/space-reservations'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/spaces" element={<Spaces />} />
      <Route path="/spaces/:id" element={<SpaceDetail />} />
      <Route path="/spaces/:id/reservations" element={<SpaceReservations />} />
    </Routes>
  )
}
