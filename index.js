const fillTripsSelect = function(tripsData) {
  const tripsSelect = document.querySelector('#trips-select')
  tripsSelect.innerHTML = ""
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

const formEventDelegation = function() {
  const newTripFormDiv = document.querySelector('#new-trip-form')
  const newTripForm = newTripFormDiv.querySelector('form')

  newTripForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const tripName = e.target.querySelector('input').value
    API.createTrip(tripName)
    .then(json => {
      if (json['errors']) {
        alert(json['errors'][0])
      } else {
        Trip.load(json)
        loadTrips()
      }
    })
  })

  const loadTripForm = document.querySelector('#load-trip-form')
  loadTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const tripId = e.target.querySelector('select').value
    
    Day.clearDaysDiv()

    API.getTripData(tripId)
    .then(json => Trip.load(json))
  })

  const addDayButton = document.querySelector('#add-day-button')
  addDayButton.addEventListener('click', (e) => {
    const tripId = document.querySelector('#trip-data').dataset.tripId
    API.createDay(tripId)
    .then(json => Day.load(json))
  })
}

const dayEventDelegation = function() {
  const daysDiv = document.querySelector('#trip-days')
  daysDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('day-data')) {
      Togglable.toggleDayReservations(e.target)
    } else if (e.target.classList.contains('delete')) {
      const dayId = e.target.parentElement.dataset.dayId
      API.destroyDay(dayId)
      .then(json => Day.destroy(json))
    }
  })
}

const newReservationEventDelegation = function() {
  const newReservationDiv = document.querySelector('#add-reserve-form-div')
  newReservationDiv.addEventListener('change', (e) => {
    if (e.target.id === 'restaurant-resort-select') {
      const type = e.target.selectedOptions[0].dataset.type
      if (type === 'park') {
        Loadable.loadRestaurantsByParkSelection(e.target.value)
      } else if (type === 'resort') {
        Loadable.loadRestaurantsByResortSelection(e.target.value)
      }
    } else if (e.target.id === 'park-select') {
      Loadable.loadAttractionsByParksSelection(e.target.value)
    }
  })
  newReservationDiv.addEventListener('submit', (e) => {
    e.preventDefault()
    debugger
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadTrips()
  formEventDelegation()
  dayEventDelegation()
  newReservationEventDelegation()
  Loadable.loadRestaurantResortSelection()
  Loadable.loadAttractionParksSelection()
})