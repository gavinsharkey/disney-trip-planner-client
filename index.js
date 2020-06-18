const eventDelegation = function() {
  const newTripFormDiv = document.querySelector('#new-trip-form')
  const newTripForm = newTripFormDiv.querySelector('form')

  newTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const div = document.querySelector('#new-trip-form')
    const tripDataDiv = document.querySelector('#trip')
    div.classList.add('hidden')
    tripDataDiv.classList.remove('hidden')
  })

  const loadTripForm = document.querySelector('#load-trip-form')
  loadTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
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