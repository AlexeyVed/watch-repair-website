import { format, addDays } from 'date-fns'

const getDate = () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      date: new Date('1970-01-01'),
      time: 10
    }
  }

  const now = new Date()
  const tomorrowDate = addDays(now, 1)

  const date = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    hour: now.getHours() + 1,
    getHours () {
      return this.hour < 9 || this.hour > 17 ? 9 : this.hour
    },
    getDate () {
      let { year, month, day, hour } = this
      if (hour > 17) {
        year = tomorrowDate.getFullYear()
        month = tomorrowDate.getMonth()
        day = tomorrowDate.getDate()
      }
      return format(new Date(year, month, day), 'yyyy-MM-dd')
    }
  }

  return {
    dateToString: date.getDate(),
    date: new Date(date.getDate()),
    time: date.getHours()
  }
}

export { getDate }
