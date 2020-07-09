class Sortable {
  static sortByTime(array, callback) {
    return array.slice().sort((a, b) => {
      a = callback(a)
      b = callback(b)
      const [aHour, aMinute] = a.split(':')
      const [bHour, bMinute] = b.split(':')
      if (parseInt(aHour) < parseInt(bHour)) {
        return -1
      } else if (parseInt(aHour) > parseInt(bHour)) {
        return 1
      } else {
        if (parseInt(aMinute) < parseInt(bMinute)) {
          return -1
        } else if (parseInt(aMinute) > parseInt(bMinute)) {
          return 1
        } else {
          return 0
        }
      }
    })
  }
}