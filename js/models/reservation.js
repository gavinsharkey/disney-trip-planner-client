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

  static load(data) {
    const res = new Reservation(data)
    res.renderHTML()
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

  renderHTML() {
    const dayReservationList = document.querySelector(`li[data-day-id="${this.dayId}"] ul`)
    dayReservationList.innerHTML += `
      <li class="list-group-item p-2 text-dark" data-reservation-id="${this.id}">
        <span>${this.type}: ${this.name}</span>
        <span>, at ${this.time}</span>
      </li>
    `
  }
}