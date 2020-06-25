class Trip {
  static all = []

  constructor({ id, name }) {
    this.name = name
    this.id = id
    Trip.all.push(this)
  }

  static create(tripName) {
    API.createTrip(tripName)
    .then(json => {
      if (json.errors) {
        alert(json.errors)
      } else {
        this.load(json)
        Loadable.loadTrips()
      }
    })
  }
  
  static show(tripId) {
    Day.clearDaysDiv()
    API.getTripData(tripId)
    .then(json => this.load(json))
  }

  static update(tripId, tripName) {
    API.updateTrip(tripId, tripName)
    .then(json => {
      if (json.errors) {
        Togglable.toggleTripEditForm(false)
        alert(json.errors)
      } else {
        this.reload(json)
        Loadable.loadTrips()
      }
    })
  }

  static destroy(tripId) {
    API.destroyTrip(tripId)
    .then(resp => {
      this.unload()
      Loadable.loadTrips()
    })
  }

  static reload(data) {
    const trip = new Trip(data)
    trip.setHTML()
  }

  static load(data) {
    const trip = new Trip(data)
    trip.setHTML()
    Togglable.toggleTripDiv(true)

    Day.loadMultiple(data.days)
  }

  static unload() {
    Day.clearDaysDiv()
    Togglable.toggleTripDiv(false)

    const tripNameDiv = document.querySelector('div#trip-name-area')
    const tripDataDiv = document.querySelector('#trip-data')

    tripNameDiv.innerHTML = ''
    tripNameDiv.dataset.tripName = ''
    tripDataDiv.dataset.tripId = ''
  }

  setHTML() {
    const tripNameDiv = document.querySelector('div#trip-name-area')
    const tripDataDiv = document.querySelector('#trip-data')

    tripNameDiv.innerHTML = `<h3>${this.name}</h3>`
    tripNameDiv.dataset.tripName = this.name
    tripDataDiv.dataset.tripId = this.id
  }
}