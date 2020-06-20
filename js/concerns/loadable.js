class Loadable {
  static loadRestaurantResortSelection() {
    const selectBox = document.querySelector('#restaurant-resort-select')

    API.loadParks()
    .then(json => {
      for (let park of json) {
        selectBox.innerHTML += `
          <option value="${park.id}" data-type="park">${park.name}</option>
        `
      }
    })

    API.loadResorts()
    .then(json => {
      for (let resort of json) {
        selectBox.innerHTML += `
          <option value="${resort.id}" data-type="resort">${resort.name}</option>
        `
      }
    })
  }

  static loadAttractionParksSelection() {
    const selectBox = document.querySelector('#park-select')

    API.loadParks()
    .then(json => {
      for (let park of json) {
        selectBox.innerHTML += `
          <option value="${park.id}">${park.name}</option>
        `
      }
    })
  }

  static fillRestaurantSelect(data) {
    const selectBox = document.querySelector('#restaurant-reservable-id-select')
    selectBox.innerHTML = ''
    for (let restaurant of data) {
      selectBox.innerHTML += `
        <option value="${restaurant.id}">${restaurant.name}</option>
      `
    }
  }

  static fillAttractionSelect(data) {
    const selectBox = document.querySelector('#attraction-reservable-id-select')
    selectBox.innerHTML = ''
    for (let attraction of data) {
      selectBox.innerHTML += `
        <option value="${attraction.id}">${attraction.name}</option>
      `
    }
  }

  static loadAttractionsByParksSelection(parkId) {
    API.loadAttractionsByPark(parkId)
    .then(json => {
      this.fillAttractionSelect(json)
    })
  }

  static loadRestaurantsByParkSelection(parkId) {
    API.loadRestaurantsByPark(parkId)
    .then(json => {
      this.fillRestaurantSelect(json)
    })
  }

  static loadRestaurantsByResortSelection(parkId) {
    API.loadRestaurantsByResort(parkId)
    .then(json => {
      this.fillRestaurantSelect(json)
    })
  }
}