class Trip {
  static all = []

  constructor({ id, name }) {
    this.name = name
    this.id = id
    Trip.all.push(this)
  }

  static load(data) {
    const trip = new Trip(data)
    trip.setHTML()
    Togglable.toggleTripDiv()
  }

  setHTML() {
    const tripNameHeader = document.querySelector('#trip-name')
    const tripDaysList = document.querySelector('#trip-days')

    tripNameHeader.innerHTML = this.name
    tripDaysList.dataset.tripId = this.id
  }
}