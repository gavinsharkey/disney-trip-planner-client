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

    for (let day of data['days']) {
      Day.load(day)
    }
  }

  setHTML() {
    const tripNameHeader = document.querySelector('#trip-name')
    const tripDataDiv = document.querySelector('#trip-data')

    tripNameHeader.innerHTML = this.name
    tripDataDiv.dataset.tripId = this.id
  }
}