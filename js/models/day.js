class Day {
  static all = []

  constructor({ id, trip_id, place }) {
    this.id = id
    this.tripId = trip_id
    this.place = place
  }

  static load(data) {
    const day = new Day(data)
    day.renderHTML()

    for (let reservation of data['reservations']) {
      Reservation.load(reservation)
    }
  }

  renderHTML() {
    const daysDiv = document.querySelector('#trip-days')
    daysDiv.innerHTML += `
      <li class="list-group-item list-group-item-primary p-1" data-day-id="${this.id}">
        <span>Day ${this.place}</span>
        <button class="btn btn-dark btn-sm">Delete</button>
        <ul class="list-group"></ul>
      </li>
    `
  }
}