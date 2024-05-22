import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

export function Calendar() {
  const [date, setDate] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  )

  function handleChange(ranges) {
    setDate(ranges.selection)
  }
  return (
    <DateRangePicker
      ranges={[date]}
      onChange={handleChange}
      minDate={new Date()}
    />
  )

}
