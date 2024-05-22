import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { DatePicker } from '@/components/date-picker'
import { Gallery } from '@/components/gallery'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useShowSpaceQuery } from '@/queries/useShowSpaceQuery'
import { useSpaceHoursQuery } from '@/queries/useSpaceHoursQuery'
import { formatPrice } from '@/utils/format-price'
import { Toggle } from '@/components/ui/toggle'
import { startOfTomorrow } from 'date-fns'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'
import toast from 'react-hot-toast'

type Hour = {
  hour: string
  available: boolean
  selected: boolean
  disabled: boolean
}

export function SpaceDetail() {
  const { token } = useAuth()
  const { id } = useParams()
  const [date, setDate] = useState<Date | undefined>(startOfTomorrow())
  const navigate = useNavigate()
  const showSpaceQuery = useShowSpaceQuery(id)
  const spaceHoursQuery = useSpaceHoursQuery({
    id,
    date: date?.toISOString().slice(0, 10),
  })
  const [hours, setHours] = useState<Hour[]>([])

  const hoursSelected = hours.filter((item) => item.selected)

  const handleClickReserve = async () => {
    if (token) {
      const startTime = hoursSelected[0].hour
      const endTime =
        Number(hoursSelected[hoursSelected.length - 1].hour.slice(0, 2)) + 1

      const payload = {
        space_id: Number(id),
        start_time: `${startTime}:00`,
        end_time: `${endTime.toString().padStart(2, '0')}:00:00`,
        date: date?.toISOString().slice(0, 10),
      }

      await api.post('/reservations', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Reserva realizada com sucesso')
      navigate('/')
    } else {
      navigate('/sign-in')
    }
  }

  const handleToggleHour = (hour: string) => {
    setHours((state) => {
      const newState = state.map((item) => {
        if (item.hour === hour) {
          return { ...item, selected: !item.selected }
        }
        return item
      })
      const firsItemSelectedIndex = newState.findIndex((item) => item.selected)
      const lastHourSelected = newState
        .slice()
        .reverse()
        .find((item) => item.selected)?.hour
      const lastItemSelectedIndex = newState.findIndex(
        (item) => item.hour === lastHourSelected
      )
      const enabledItemsIndex = [
        firsItemSelectedIndex - 1,
        firsItemSelectedIndex,
        lastItemSelectedIndex,
        lastItemSelectedIndex + 1,
      ]

      return newState.map((item, index) => {
        const enabled =
          firsItemSelectedIndex === -1
            ? true
            : enabledItemsIndex.includes(index)

        return { ...item, disabled: !item.available || !enabled }
      })
    })
  }

  useEffect(() => {
    if (spaceHoursQuery.data) {
      setHours(
        spaceHoursQuery.data.map((item) => ({
          ...item,
          selected: false,
          disabled: !item.available,
        }))
      )
    }
  }, [spaceHoursQuery.data])

  return (
    <div>
      <Header />
      {showSpaceQuery.data && (
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl mb-8">{showSpaceQuery.data.name}</h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Gallery
              images={
                showSpaceQuery.data.space_images.map((image) => ({
                  src: image,
                  alt: showSpaceQuery.data.name,
                })) || []
              }
            />

            <div>
              <div className="flex justify-between mb-4">
                <span>{formatPrice(showSpaceQuery.data.price)} Hora</span>
                <span>{showSpaceQuery.data.capacity} pessoas</span>
              </div>

              <DatePicker date={date} setDate={setDate} />

              <h3 className="mb-4 mt-4">Selecionar horários</h3>
              {hours && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {hours.map((item) => (
                    <Toggle
                      key={item.hour}
                      variant="outline"
                      pressed={item.selected}
                      disabled={item.disabled}
                      onPressedChange={() => handleToggleHour(item.hour)}
                    >
                      {item.hour}
                    </Toggle>
                  ))}
                </div>
              )}
              <Button
                disabled={!hoursSelected.length}
                size="lg"
                className="w-full mb-4"
                onClick={handleClickReserve}
              >
                Reservar
              </Button>
              {!!hoursSelected.length && (
                <>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        hoursSelected.length * showSpaceQuery.data.price
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
