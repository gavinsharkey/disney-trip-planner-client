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