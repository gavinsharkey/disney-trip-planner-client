class Togglable {
  static toggleTripDiv() {
    const div = document.querySelector('#new-trip-form')
    const tripDataDiv = document.querySelector('#trip')
    div.classList.add('hidden')
    tripDataDiv.classList.remove('hidden')
  }

  static toggleDayReservations(dayElement) {
    const reseravtionsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    if (reseravtionsDiv.classList.contains('hidden')) {
      dayElement.classList.add('active')
      reseravtionsDiv.classList.remove('hidden')
      liMessage.innerText = 'Click to hide reservations'
    } else {
      dayElement.classList.remove('active')
      reseravtionsDiv.classList.add('hidden')
      liMessage.innerText = 'Click to view reservations'
    }
  }
}