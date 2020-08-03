class API {
  static loadResorts() {
    return fetch('https://disneytripapiproduction.herokuapp.com/resorts')
    .then(resp => resp.json())
  }

  static loadParks() {
    return fetch('https://disneytripapiproduction.herokuapp.com/parks')
    .then(resp => resp.json())
  }

  static loadAttractionsByPark(parkId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/parks/${parkId}/attractions`)
    .then(resp => resp.json())
  }

  static loadRestaurantsByPark(parkId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/parks/${parkId}/restaurants`)
    .then(resp => resp.json())
  }

  static loadRestaurantsByResort(resortId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/resorts/${resortId}/restaurants`)
    .then(resp => resp.json())
  }

  static createTrip(tripName) {
    return fetch('https://disneytripapiproduction.herokuapp.com/trips', {
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
    return fetch('https://disneytripapiproduction.herokuapp.com/trips')
    .then(resp => resp.json())
    .catch(err => err)
  }

  static getTripData(tripId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/trips/${tripId}`)
    .then(resp => resp.json())
    .catch(err => console.log(`ERROR: ${err}`))
  }

  static loadDaysByTrip(tripId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/trips/${tripId}/days`)
    .then(resp => resp.json())
    .catch(err => console.log(`ERROR: ${err}`))
  }

  static updateTrip(tripId, tripName) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/trips/${tripId}`, {
      method: 'PATCH',
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

  static destroyTrip(tripId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/trips/${tripId}`, {
      method: 'DELETE'
    })
  }

  static createDay(tripId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/trips/${tripId}/days`, {
      method: 'POST'
    })
    .then(resp => resp.json())
  }

  static destroyDay(dayId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/days/${dayId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }

  static getReservations(dayId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/days/${dayId}/reservations`)
    .then(resp => resp.json())
  }

  static createReservation({dayId, reservableId, reservableType, time}) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/reservations`, {
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

  static updateReservation(reservationId, newTime) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/reservations/${reservationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reservation: {
          time: newTime
        }
      })
    })
    .then(resp => resp.json())
  }

  static destroyReservation(reservationId) {
    return fetch(`https://disneytripapiproduction.herokuapp.com/reservations/${reservationId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }
}