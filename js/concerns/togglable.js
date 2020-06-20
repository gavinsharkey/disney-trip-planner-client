class Togglable {
  static toggleTripDiv() {
    const div = document.querySelector('#new-trip-form')
    const tripDataDiv = document.querySelector('#trip')
    div.classList.add('hidden')
    tripDataDiv.classList.remove('hidden')
  }

  static deactivateDay(dayElement) {
    const reseravtionsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    Reservation.deactivateForms()
    dayElement.classList.remove('active')
    reseravtionsDiv.classList.add('hidden')
    liMessage.innerText = 'Click to view reservations'
  }

  static activateDay(dayElement) {
    const reseravtionsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    this.clearActiveDays()
    Reservation.activateForms(dayElement.dataset.dayId)
    dayElement.classList.add('active')
    reseravtionsDiv.classList.remove('hidden')
    liMessage.innerText = 'Click to hide reservations'
  } 

  static clearActiveDays() {
    const days = document.querySelectorAll('#trip-days li.day-data')
    for (let day of days) {
      this.deactivateDay(day)
    }
  }

  static toggleDayReservations(dayElement) {
    const reseravtionsDiv = dayElement.querySelector('.reservation-list')

    if (reseravtionsDiv.classList.contains('hidden')) {
      this.activateDay(dayElement)
    } else {
      this.deactivateDay(dayElement)
    }
  }
}