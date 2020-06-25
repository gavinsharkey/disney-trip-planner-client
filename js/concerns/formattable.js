class Formattable {
  static formatTime(time) {
    const [hour, minute] = time.split(':')
    if (parseInt(hour) < 12) {
      return `${time} AM`
    } else if (parseInt(hour) > 12) {
      return `${parseInt(hour) - 12}:${minute} PM`
    } else {
      return `${time} PM`
    }
  }
}