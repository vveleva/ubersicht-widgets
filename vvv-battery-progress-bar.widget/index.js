command: "pmset -g batt | grep -o '[0-9]*%; [a-z]*'",

refreshFrequency: 30000,

style: `
  // COLORS
  mainColor = #7077a9
  percentBorderColor = #7077a933
  statusColor = #7077a9aa

  mainColor = #eaeaea
  percentBorderColor = #eaeaea33
  statusColor = #eaeaeaaa

  bottom: 30px
  left: 30px
  color: mainColor
  font-family: Helvetica Neue
  width: 270px
  font-size: 12px

  .battery
    font-weight: 500

  .percent-bar--container
    display: flex
    justify-context: space-between
    align-items: center

  .percent-bar--border
    background-color: percentBorderColor
    height: 8px
    width: 200px
    display: flex
    justify-context: space-between

  .percent-bar
    background-color: mainColor

  .percent-number
    margin-left: 5px

  .status
    font-weight: normal
    color statusColor
 `,

render: function () {
  return `
    <div>
      <div class='battery'>
        BATTERY <span class='status' />
      </div>
      <div class='percent-bar--container'>
        <div class='percent-bar--border'>
          <div class='percent-bar'></div>
        </div>
        <div class='percent-number'>
          <span class='percent-input'></span>
        </div>
      </div>
    </div>
  `
},

update(output, domEl) {
  [percent, status] = output.split(";")
  domEl = $(domEl)
  domEl.find('.percent-input').html(percent)
  domEl.find('.status').html(status == !!undefined ? '' : `(${status})`)
  domEl.find('.percent-bar').css('width', percent)
}

