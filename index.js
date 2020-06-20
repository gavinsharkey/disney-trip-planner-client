const formEventDelegation = function() {
  const newTripFormDiv = document.querySelector('#new-trip-form')
  const newTripForm = newTripFormDiv.querySelector('form')

  newTripForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const tripName = e.target.querySelector('input').value
    Trip.create(tripName)
  })

  const loadTripForm = document.querySelector('#load-trip-form')
  loadTripForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const tripId = e.target.querySelector('select').value
    Trip.show(tripId)
  })

  const addDayButton = document.querySelector('#add-day-button')
  addDayButton.addEventListener('click', (e) => {
    const tripId = document.querySelector('#trip-data').dataset.tripId
    Day.create(tripId)
  })
}

const dayEventDelegation = function() {
  const daysDiv = document.querySelector('#trip-days')
  daysDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('day-data')) {
      Togglable.toggleDayReservations(e.target)
    } else if (e.target.classList.contains('delete-day')) {
      const dayId = e.target.parentElement.dataset.dayId
      Day.destroy(dayId)
    } else if (e.target.classList.contains('delete-reservation')) {
      const reservationId = e.target.parentElement.dataset.reservationId
      Reservation.destroy(reservationId)
    }
  })
}

const newReservationEventDelegation = function() {
  const newReservationDiv = document.querySelector('#add-reserve-form-div')
  newReservationDiv.addEventListener('change', (e) => {
    if (e.target.id === 'restaurant-resort-select' && e.target.value !== '') {
      const type = e.target.selectedOptions[0].dataset.type
      if (type === 'park') {
        Loadable.loadRestaurantsByParkSelection(e.target.value)
      } else if (type === 'resort') {
        Loadable.loadRestaurantsByResortSelection(e.target.value)
      }
    } else if (e.target.id === 'park-select' && e.target.value !== '') {
      Loadable.loadAttractionsByParksSelection(e.target.value)
    }
  })
  newReservationDiv.addEventListener('submit', (e) => {
    e.preventDefault()
    const { reservableType, dayId } = e.target.dataset
    const time = e.target.querySelector('input[name="time"]').value
    const reservableId = e.target.querySelector('select[name="reservable_id"]').value

    Reservation.create({
      dayId,
      reservableId,
      reservableType,
      time
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  Loadable.loadTrips()
  formEventDelegation()
  dayEventDelegation()
  newReservationEventDelegation()
  Loadable.loadRestaurantResortSelection()
  Loadable.loadAttractionParksSelection()
})