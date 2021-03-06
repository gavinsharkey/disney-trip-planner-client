class Reservation {
  static all = []

  constructor({ id, day_id, reservable_type, time, reservable: { name } }) {
    this.id = id
    this.dayId = day_id
    this.type = reservable_type
    this.time = time
    this.name = name
    Reservation.all.push(this)
  }

  static create(data) {
    API.createReservation(data)
    .then(json => {
      if (json.errors) {
        alert(json.errors)
      } else {
        this.load(json)
        this.reloadReservationsInPlace(json.day_id)
        // this.reloadReservations(json.day_id)
      }
    })
    this.clearForms()
  }

  static update(reservationId, newTime) {
    API.updateReservation(reservationId, newTime)
    .then(json => {
      if (json.errors) {
        Togglable.toggleEditReservationForm(reservationId, false)
        alert(json.errors)
      } else {
        const res = new Reservation(json)
        res.updateHTML()
        this.reloadReservationsInPlace(res.dayId)
      }
    })
  }

  static destroy(reservationId) {
    API.destroyReservation(reservationId)
    .then(json => {
      const res = new Reservation(json)
      res.removeHTML()
    })
  }

  static reloadReservationsInPlace(dayId) {
    const dayReservationList = document.querySelector(`li[data-day-id="${dayId}"] ul`)
    const dayReservations = Array.from(dayReservationList.querySelectorAll('li'))
    
    const sortedDayReservations = Sortable.sortByTime(dayReservations, li => li.dataset.time)
    dayReservationList.innerHTML = sortedDayReservations.map(li => li.outerHTML).join('')
  }

  // static reloadReservations(dayId) {
  //   API.getReservations(dayId)
  //   .then(json => {
  //     this.clearReservationList(dayId)
  //     this.loadMultiple(json)
  //   })
  // }

  static loadMultiple(reservations) {
    reservations = Sortable.sortByTime(reservations, elem => elem.time)
    for (let reservation of reservations) {
      this.load(reservation)
    }
  }

  static load(data) {
    const res = new Reservation(data)
    res.renderHTML()
  }

  static clearReservationList(dayId) {
    const dayReservationList = document.querySelector(`li[data-day-id="${dayId}"] ul`)
    dayReservationList.innerHTML = ''
  }

  static clearForms() {
    const restaurantTimeField = document.querySelector('form#restaurant-reserve-form input[name="time"]')
    const attractionTimeField = document.querySelector('form#attraction-reserve-form input[name="time"]')

    restaurantTimeField.value = ''
    attractionTimeField.value = ''
  }

  static deactivateForms() {
    const restaurantForm = document.querySelector('#restaurant-reserve-form')
    const attractionForm = document.querySelector('#attraction-reserve-form')

    const restaurantSubmit = restaurantForm.querySelector('input[type="submit"]')
    const attractionSubmit = attractionForm.querySelector('input[type="submit"]')

    restaurantForm.dataset.dayId = ''
    attractionForm.dataset.dayId = ''

    restaurantSubmit.disabled = true
    attractionSubmit.disabled = true
  }

  static activateForms(dayId) {
    const restaurantForm = document.querySelector('#restaurant-reserve-form')
    const attractionForm = document.querySelector('#attraction-reserve-form')

    const restaurantSubmit = restaurantForm.querySelector('input[type="submit"]')
    const attractionSubmit = attractionForm.querySelector('input[type="submit"]')

    restaurantForm.dataset.dayId = dayId
    attractionForm.dataset.dayId = dayId

    restaurantSubmit.disabled = false
    attractionSubmit.disabled = false
  }

  get formattedTime() {
    return Formattable.formatTime(this.time)
  }

  removeHTML() {
    const reservationLi = document.querySelector(`li[data-reservation-id="${this.id}"]`)
    reservationLi.remove()
  }

  updateHTML() {
    const reservationLi = document.querySelector(`li[data-reservation-id="${this.id}"]`)
    reservationLi.dataset.time = this.time
    reservationLi.querySelector('span.reservation-time').innerHTML = `Time: ${this.formattedTime}`
  }

  renderHTML() {
    const dayReservationList = document.querySelector(`li[data-day-id="${this.dayId}"] ul`)
    dayReservationList.innerHTML += `
      <li class="list-group-item p-2 text-dark" data-reservation-id="${this.id}" data-reservation-type="${this.type}" data-time="${this.time}">
        <span>${this.type}: ${this.name}</span>
        <span class="reservation-time">Time: ${this.formattedTime}</span>
        <button class="delete-reservation btn btn-sm btn-danger mx-1 p-1 float-right">Delete</button>
        <button class="edit-reservation btn btn-sm btn-dark mx-1 p-1 float-right" data-action="edit">Edit Time</button>
      </li>
    `
  }
}