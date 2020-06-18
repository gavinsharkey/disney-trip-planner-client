class Togglable {
  static toggleTripDiv() {
    const div = document.querySelector('#new-trip-form')
    const tripDataDiv = document.querySelector('#trip')
    if (tripDataDiv.classList.contains('hidden')) {
      div.classList.add('hidden')
      tripDataDiv.classList.remove('hidden')
    } else {
      div.classList.remove('hidden')
      tripDataDiv.classList.add('hidden')
    }
  }
}