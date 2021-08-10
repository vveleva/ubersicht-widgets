command: `
2>/dev/null system_profiler SPBluetoothDataType | grep -E "Battery|Services" | sed "s/Services://g" | sed "s/Battery Level://g" | sed "s/Apple Wireless//g" | sed -e 's/^[ \t]*//' | paste -d" " - -
`,

refreshFrequency: 2000,

style: `
  // COLORS
  mainColor = #7077a9
  percentBorderColor = #7077a933
  statusColor = #7077a9aa

  mainColor = #eaeaea
  percentBorderColor = #eaeaea33
  statusColor = #eaeaeaaa

  bottom: 80px
  left: 30px
  color: mainColor
  font-family: Helvetica Neue
  width: 270px
  font-size: 12px

  .cpu
    font-weight: 500

  .devices-container
    margin-top: 5px

  p
    font-weight: normal

  .pid
    font-size: 10px
    font-weight: normal

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

  .device-container
    margin-bottom: 5px

  .status
    font-weight: normal
    color: statusColor
 `,

render: function () {
  return `
    <div class='container'>
      <div class='cpu'>BLUETOOTH DEVICES</div>
      <div class='devices-container'></div>
    </div>
  `
},

update(output, domEl) {
  devices = output.trim().split('\n')
  devicesContainer = $(domEl).find('.devices-container')
  pattern = /(.*?)(\d{1,3}%)/

  renderInfo = function (name, percent) {
    return `
      <div class='device-container'>
        <div class='device-name'> ${name} </div>
        <div class='percent-bar--container'>
          <div class='percent-bar--border'>
            <div class='percent-bar' style='width: ${percent}'></div>
          </div>
          <div class='percent-number'> ${percent} </div>
        </div>
      </div>
    `
  }

  devicesContainer.empty()
  devices.forEach((device, i) => {
    if (device.match(pattern)) {
      [match, name, percent] = device.match(pattern)
      devicesContainer.append(renderInfo(name.trim(), percent))
    }
  })
}
