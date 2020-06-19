class API {
  static createTrip(tripName) {
    return fetch('http://localhost:3000/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trip: {
          name: tripName
        }
      })
    })
    .then(resp => resp.json())
  }

  static getTripsData() {
    return fetch('http://localhost:3000/trips')
    .then(resp => resp.json())
    .catch(err => err)
  }

  static getTripData(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}`)
    .then(resp => resp.json())
    .catch(err => console.log(`ERROR: ${err}`))
  }

  static loadDaysByTrip(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}/days`)
    .then(resp => resp.json())
    .catch(err => console.log(`ERROR: ${err}`))
  }

  static createDay(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}/days`, {
      method: 'POST'
    })
    .then(resp => resp.json())
  }

  static destroyDay(dayId) {
    return fetch(`http://localhost:3000/days/${dayId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }
}