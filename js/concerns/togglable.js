class Togglable {
  static toggleTripDiv(activate) {
    const div = document.querySelector('#new-trip-form')
    const tripDataDiv = document.querySelector('#trip')
    
    if (activate) {
      div.classList.add('hidden')
      tripDataDiv.classList.remove('hidden')
    } else {
      div.classList.remove('hidden')
      tripDataDiv.classList.add('hidden')
    }
  }

  static deactivateDay(dayElement) {
    const reservationsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    Reservation.deactivateForms()
    dayElement.classList.remove('active')
    reservationsDiv.classList.add('hidden')
    liMessage.innerText = 'Click to view reservations'
  }

  static activateDay(dayElement) {
    const reservationsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    this.clearActiveDays()
    Reservation.activateForms(dayElement.dataset.dayId)
    dayElement.classList.add('active')
    reservationsDiv.classList.remove('hidden')
    liMessage.innerText = 'Click to hide reservations'
  } 

  static clearActiveDays() {
    const days = document.querySelectorAll('#trip-days li.day-data')
    for (let day of days) {
      this.deactivateDay(day)
    }
  }

  static toggleDayReservations(dayElement) {
    const reservationsDiv = dayElement.querySelector('.reservation-list')

    if (reservationsDiv.classList.contains('hidden')) {
      this.activateDay(dayElement)
    } else {
      this.deactivateDay(dayElement)
    }
  }
}