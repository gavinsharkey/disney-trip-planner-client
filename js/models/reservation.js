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
      }
    })
    this.clearForms()
  }

  static destroy(reservationId) {
    API.destroyReservation(reservationId)
    .then(json => {
      const res = new Reservation(json)
      res.removeHTML()
    })
  }

  static load(data) {
    const res = new Reservation(data)
    res.renderHTML()
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
    const [hour, minute] = this.time.split(':')
    if (parseInt(hour) < 12) {
      return `${this.time} AM`
    } else if (parseInt(hour) > 12) {
      return `${parseInt(hour) - 12}:${minute} PM`
    } else {
      return `${this.time} PM`
    }
  }

  removeHTML() {
    const reservationLi = document.querySelector(`li[data-reservation-id="${this.id}"]`)
    reservationLi.remove()
  }

  renderHTML() {
    const dayReservationList = document.querySelector(`li[data-day-id="${this.dayId}"] ul`)
    dayReservationList.innerHTML += `
      <li class="list-group-item p-2 text-dark" data-reservation-id="${this.id}" data-reservation-type="${this.type}" data-time="${this.time}">
        <span>${this.type}: ${this.name}, at ${this.formattedTime}</span>
        <button class="delete-reservation btn btn-sm btn-dark p-1 float-right">Delete</button>
      </li>
    `
  }
}