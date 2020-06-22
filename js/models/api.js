class API {
  static loadResorts() {
    return fetch('http://localhost:3000/resorts')
    .then(resp => resp.json())
  }

  static loadParks() {
    return fetch('http://localhost:3000/parks')
    .then(resp => resp.json())
  }

  static loadAttractionsByPark(parkId) {
    return fetch(`http://localhost:3000/parks/${parkId}/attractions`)
    .then(resp => resp.json())
  }

  static loadRestaurantsByPark(parkId) {
    return fetch(`http://localhost:3000/parks/${parkId}/restaurants`)
    .then(resp => resp.json())
  }

  static loadRestaurantsByResort(resortId) {
    return fetch(`http://localhost:3000/resorts/${resortId}/restaurants`)
    .then(resp => resp.json())
  }

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

  static destroyTrip(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}`, {
      method: 'DELETE'
    })
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

  static createReservation({dayId, reservableId, reservableType, time}) {
    return fetch(`http://localhost:3000/reservations`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reservation: {
          day_id: parseInt(dayId),
          reservable_id: parseInt(reservableId),
          reservable_type: reservableType,
          time: time
        }
      })
    })
    .then(resp => resp.json())
  }

  static destroyReservation(reservationId) {
    return fetch(`http://localhost:3000/reservations/${reservationId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }
}