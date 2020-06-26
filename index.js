const formEventDelegation = function() {
  const newTripFormDiv = document.querySelector('#new-trip-form')
  newTripFormDiv.addEventListener('submit', (e) => {
    e.preventDefault()
    const tripNameInput = e.target.querySelector('input')
    const tripName = tripNameInput.value

    Trip.create(tripName)
    tripNameInput.value = ''
  })

  const loadTripForm = document.querySelector('#load-trip-form')
  loadTripForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const tripId = e.target.querySelector('select').value
    Trip.show(tripId)
  })

  const tripButtons = document.querySelector('#trip-buttons')
  tripButtons.addEventListener('click', (e) => {
    const tripId = document.querySelector('#trip-data').dataset.tripId
    const tripNameDiv = document.querySelector('div#trip-name-area')
    if (e.target.id === 'add-day-button') {
      Day.create(tripId)
    } else if (e.target.id === 'delete-trip-button') {
      Trip.destroy(tripId)
    } else if (e.target.id === 'edit-trip-button') {
      if (e.target.dataset.action === 'edit') {
        e.target.innerHTML = 'Save'
        e.target.dataset.action = 'update'

        Togglable.toggleTripEditForm(true)
      } else if (e.target.dataset.action === 'update') {
        e.target.innerHTML = 'Edit Trip'
        e.target.dataset.action = 'edit'

        const newTripName = tripNameDiv.querySelector('input').value
        Trip.update(tripId, newTripName)
      }
    }
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
    } else if (e.target.classList.contains('edit-reservation')) {
      const reservationId = e.target.parentElement.dataset.reservationId
      if (e.target.dataset.action === 'edit') {
        e.target.dataset.action = 'update'
        e.target.innerHTML = 'Save'

        Togglable.toggleEditReservationForm(reservationId, true)
      } else if (e.target.dataset.action === 'update') {
        e.target.dataset.action = 'edit'
        e.target.innerHTML = 'Edit Time'
        
        const newTime = e.target.parentElement.querySelector('span.reservation-time input').value
        Reservation.update(reservationId, newTime)
      }
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
  Loadable.loadRestaurantResortSelection()
  Loadable.loadAttractionParksSelection()

  formEventDelegation()
  dayEventDelegation()
  newReservationEventDelegation()
})