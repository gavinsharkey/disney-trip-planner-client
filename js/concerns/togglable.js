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

  static toggleTripEditForm(activate) {
    const tripNameDiv = document.querySelector('div#trip-name-area')
    if (activate) {
      tripNameDiv.innerHTML = `
        <input class="form-control" value="${tripNameDiv.dataset.tripName}">
      `
    } else {
      tripNameDiv.innerHTML = `
       <h3>${tripNameDiv.dataset.tripName}</h3>
       `
    }
  }

  // static deactivateDay(dayElement) {
  //   const reservationsDiv = dayElement.querySelector('.reservation-list')
  //   const liMessage = dayElement.querySelector('span.message')

  //   Reservation.deactivateForms()
  //   dayElement.classList.remove('active')
  //   reservationsDiv.classList.add('hidden')
  //   liMessage.innerText = 'Click to view reservations'
  // }

  // static activateDay(dayElement) {
  //   const reservationsDiv = dayElement.querySelector('.reservation-list')
  //   const liMessage = dayElement.querySelector('span.message')

  //   this.clearActiveDays()
  //   Reservation.activateForms(dayElement.dataset.dayId)
  //   dayElement.classList.add('active')
  //   reservationsDiv.classList.remove('hidden')
  //   liMessage.innerText = 'Click to hide reservations'
  // } 

  static toggleDay(activate, dayElement) {
    const reservationsDiv = dayElement.querySelector('.reservation-list')
    const liMessage = dayElement.querySelector('span.message')

    if (activate) {
      this.clearActiveDays()
      Reservation.activateForms(dayElement.dataset.dayId)
      dayElement.classList.add('active')
      reservationsDiv.classList.remove('hidden')
      liMessage.innerText = 'Click to hide reservations'
    } else {
      Reservation.deactivateForms()
      dayElement.classList.remove('active')
      reservationsDiv.classList.add('hidden')
      liMessage.innerText = 'Click to view reservations'
    }
  }

  static clearActiveDays() {
    const days = document.querySelectorAll('#trip-days li.day-data')
    for (let day of days) {
      this.toggleDay(false, day)
    }
  }

  static toggleDayReservations(dayElement) {
    const reservationsDiv = dayElement.querySelector('.reservation-list')

    if (reservationsDiv.classList.contains('hidden')) {
      this.toggleDay(true, dayElement)
    } else {
      this.toggleDay(false, dayElement)
    }
  }

  static toggleEditReservationForm(reservationId, activate) {
    const reservationLi = document.querySelector(`li[data-reservation-id="${reservationId}"]`)
    const reservationTimeSpan = reservationLi.querySelector('span.reservation-time')
    
    if (activate) {
      reservationTimeSpan.innerHTML = `<input type="time" value="${reservationLi.dataset.time}">`
    } else {
      reservationTimeSpan.innerHTML = `<span>Time: ${Formattable.formatTime(reservationLi.dataset.time)}</span>`
    }
  }
}