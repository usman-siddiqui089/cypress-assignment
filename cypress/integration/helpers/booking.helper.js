const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const futureDate = new Date(currentDate.setDate(currentDayOfMonth + 14))
let dateOptions = {
    timeZone: 'Europe/Stockholm',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  dateFormatter = new Intl.DateTimeFormat([], dateOptions);

const formattedDate = new Date(dateFormatter.format(futureDate))
const swedishMonth = formattedDate.toLocaleDateString('sv-SE', {timeZone: 'Europe/Stockholm', month: 'long'})
const swedishDay = formattedDate.toLocaleDateString('sv-SE', {timeZone: 'Europe/Stockholm', day: 'numeric'})
const swedishYear = formattedDate.toLocaleDateString('sv-SE', {timeZone: 'Europe/Stockholm', year: 'numeric'})
const swedishMonthInitCap = swedishMonth.charAt(0).toUpperCase() + swedishMonth.slice(1)
const swedishDateString = `${swedishMonthInitCap} ${swedishDay}, ${swedishYear}`

let timeOptions = {
    timeZone: 'Europe/Stockholm',
    hour: 'numeric',
    minute: 'numeric',
  },
  timeFormatter = new Intl.DateTimeFormat([], timeOptions);

const initialStartTime = new Date()
const initialEndTime = new Date()
const startTime = new Date(initialStartTime.setHours(initialStartTime.getHours() + 7))
const endTime = new Date(initialEndTime.setHours(initialEndTime.getHours() + 8))

const formattedStartTime = timeFormatter.format(startTime)
const formattedEndTime = timeFormatter.format(endTime)

const dateTimeObj = {
  day : swedishDateString,
  startTime: formattedStartTime,
  endTime: formattedEndTime
}

export default dateTimeObj