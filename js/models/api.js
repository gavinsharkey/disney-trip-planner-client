class API {
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
}