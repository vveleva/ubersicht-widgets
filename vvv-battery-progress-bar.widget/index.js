command: "pmset -g batt | grep -o '[0-9]*%; [a-z]*'",

refreshFrequency: 30000,

style: `
    // COLORS
    mainColor = #7077a9
    percentBorderColor = #7077a933
    statusColor = #7077a9aa

    bottom: 200px
    right: 20px
    color: mainColor
    font-family: Helvetica Neue
    width: 270px
    font-size: 12px
    text-shadow: 0 0 1px rgba(#000, 1)

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
        BATTERY <span class='status'>(<span class='status-input'></span>)</span>
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
  domEl.find('.status-input').html(status)
  domEl.find('.percent-bar').css('width', percent)
}

