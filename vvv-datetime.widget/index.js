command: "date +%A,%b,%e,%Y,%l,%M,%p",

refreshFrequency: 5000,

style: `
  // COLORS
  mainColor = #7077a9
  secondaryColor = #7077a9aa
  faintColor = #7077a933

  size = 600px
  width: size
  margin-left: -0.5 * size
  height: 120px
  bottom: 30px
  left: 50%
  font-family: Helvetica Neue
  font-weight: 100

  .datetime-container
    color: mainColor
    display: flex
    align-items: center
    vertical-align: middle
    display: flex
    justify-content: center

  .date-container
    display: flex
    flex-direction: column
    text-align: left
    margin-left: 15px

  .current-time
    font-size: 100px
    font-weight: 200

  .current-date
    color: secondaryColor
    font-size: 35px

  .current-weekday
    font-size: 30px
    color: faintColor

  .ampm
    font-weight: 100
 `,

render: function () {
  return "<div class='datetime-container'></div>"
},

update(output) {
  renderDate = function (output) {
    [weekday, month, day, year, hour, minutes, ampm] = output.split(',')
    return `
      <div class='current-time'>
        ${hour}:${minutes}<span class='ampm'>${ampm}</span>
      </div>
      <div class='date-container'>
        <div class='current-date'>
          ${month} ${day}, ${year}
        </div>
        <div class='current-weekday'>
          ${weekday}
        </div>
      </div>
    `
  }

  $('.datetime-container').html(renderDate(output))
}

