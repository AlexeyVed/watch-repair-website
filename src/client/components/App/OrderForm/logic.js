const getDate = (testDate) => {
  const now = testDate || new Date()
  const tomorrowDate = (testDate) ? new Date(now.getTime() + 24 * 60 * 60 * 1000) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

  const date = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours() + 1,
    getHours () {
      let hour = this.hour
      if (hour < 9 || hour > 17) {
        hour = 9
      }
      return hour
    },
    getFullDate () {
      let year = this.year
      let month = this.month
      let day = this.day
      if (this.hour > 17) {
        year = tomorrowDate.getFullYear()
        month = tomorrowDate.getMonth() + 1
        day = tomorrowDate.getDate()
      }
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return `${year}-${month}-${day}`
    }
  }

  return {
    date: date.getFullDate(),
    time: date.getHours()
  }
}

export { getDate }
