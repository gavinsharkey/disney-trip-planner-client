class Day {
  static all = []

  constructor({ id, trip_id, place }) {
    this.id = id
    this.tripId = trip_id
    this.place = place
  }

  static create(tripId) {
    API.createDay(tripId)
    .then(json => this.load(json))
  }

  static clearDaysDiv() {
    const daysDiv = document.querySelector('#trip-days')
    daysDiv.innerHTML = ""
  }

  static loadDays() {
    const tripId = document.querySelector('#trip-data').dataset.tripId
    this.clearDaysDiv()

    API.loadDaysByTrip(tripId)
    .then(json => this.loadMultiple(json))
  }

  static loadMultiple(days) {
    for (let dayData of days) {
      this.load(dayData)
    }
  }

  static load(data) {
    const day = new Day(data)
    day.renderHTML()

    Reservation.loadMultiple(data.reservations)
  }

  static destroy(dayId) {
    API.destroyDay(dayId)
    .then(json => {
      // const day = new Day(json)
      // day.removeHTML()
      this.loadDays()
    })
    
  }

  removeHTML() {
    const dayLi = document.querySelector(`li[data-day-id="${this.id}"]`)
    dayLi.remove()
  }

  renderHTML() {
    const daysDiv = document.querySelector('#trip-days')
    daysDiv.innerHTML += `
      <li class="list-group-item list-group-item-primary p-2 day-data" data-day-id="${this.id}">
        <span>Day ${this.place}</span>
        <button class="delete-day btn btn-dark btn-sm p-1">Delete</button>
        <span class="float-right message">Click to view reservations</span>
        <div class="hidden reservation-list">
          <ul class="list-group my-1"></ul>
        </div>
      </li>
    `
  }
}