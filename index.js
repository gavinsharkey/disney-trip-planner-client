const eventDelegation = function() {
  const newTripFormDiv = document.querySelector('#new-trip-form')
  const newTripForm = newTripFormDiv.querySelector('form')

  newTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
    Togglable.toggleTripDiv()
  })

  const loadTripForm = document.querySelector('#load-trip-form')
  loadTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const tripId = e.target.querySelector('select').value

    API.getTripData(tripId)
    .then(json => {
      Trip.load(json)
      for (let day of json['days']) {

      }
    })
  })
}

const fillTripsSelect = function(tripsData) {
  const tripsSelect = document.querySelector('#trips-select')
  for (let trip of tripsData) {
    tripsSelect.innerHTML += `
      <option value="${trip.id}">${trip.name}</option>
    `
  }
}

const loadTrips = function() {
  API.getTripsData()
  .then(json => fillTripsSelect(json))
}

document.addEventListener('DOMContentLoaded', () => {
  loadTrips()
  eventDelegation()
})