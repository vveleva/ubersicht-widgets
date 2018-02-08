command: "ps axro \"%cpu,ucomm,pid\" | awk 'FNR>1' | tail +1 | head -n 3 | sed -e 's/^[ ]*\\([0-9][0-9]*\\.[0-9][0-9]*\\)\\ /\\1\\%\\,/g' -e 's/\\ \\ *\\([0-9][0-9]*$\\)/\\,\\1/g'",

refreshFrequency: 3000,

style: `
  // COLORS
  mainColor = #7077a9
  percentBorderColor = #7077a933
  statusColor = #7077a9aa

  bottom: 30px
  left: 30px
  color: mainColor
  font-family: Helvetica Neue
  width: 250px
  font-size: 12px
  # text-shadow: 0 0 1px rgba(#000, 1)

  .cpu
    font-weight: 500

  .processes-container
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

  .process-container
    margin-bottom: 5px

  .status
    font-weight: normal
    color: statusColor
 `,

render: function () {
  return `
    <div class='container'>
      <div class='cpu'>CPU</div>
      <div class='processes-container'>
        <div class='process1'></div>
        <div class='process2'></div>
        <div class='process3'></div>
      </div>
    </div>
  `
},

update(output, domEl) {
  processes = output.trim().split('\n')
  processesContainer = $(domEl).find('.processes-container')

  renderProcess = function (cpu, name, pid) {
    return `
      <div class='process-container'>
        <div class='process-name'>
          ${name} <span class='status'>( PID: ${pid} )</span>
        </div>
        <div class='percent-bar--container'>
          <div class='percent-bar--border'>
            <div class='percent-bar' style='width: ${cpu}'></div>
          </div>
          <div class='percent-number'>
          ${cpu}
          </div>
        </div>
      </div>
    `
  }

  processes.forEach((process, i) => {
    [cpu, name, pid] = process.split(',')
    processesContainer.find(`.process${i+1}`).html(renderProcess(cpu, name, pid))
  })
}

