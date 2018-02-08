command: "ps axo \"rss,pid,ucomm\" | sort -nr | tail +1 | head -n3 | awk '{printf \"%8.0f MB,%s,%s\\n\", $1/1024, $3, $2}' && system_profiler SPHardwareDataType | grep '  Memory:'"

refreshFrequency: 5000

style: """
  /*COLORS*/
  mainColor = #7077a9
  percentBorderColor = #7077a933
  statusColor = #7077a9aa

  bottom: 30px
  right: 30px
  color: mainColor
  font-family: Helvetica Neue
  width: 250px
  font-size: 12px
  text-shadow: 0 0 1px rgba(#000, 1)

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
"""


render: -> """
  <div class='container'>
    <div class='cpu'>MEMORY</div>
    <div class='processes-container'>
      <div class='process1'></div>
      <div class='process2'></div>
      <div class='process3'></div>
    </div>
  </div>
"""

update: (output, domEl) ->
  processes = output.trim().split('\n')
  memory = processes.pop().replace(/[a-zA-Z]|\s|:/g, '')
  memory = parseInt(memory) * 1000 # convert to MB
  processesContainer = $(domEl).find('.processes-container')

  renderProcess = (cpu, name, pid) -> """
    <div class='process-container'>
      <div class='process-name'>
        #{name} <span class='status'>( PID: #{pid} )</span>
      </div>
      <div class='percent-bar--container'>
        <div class='percent-bar--border'>
          <div class='percent-bar' style='width: #{parseInt(cpu) / memory * 100.0 }%'></div>
        </div>
        <div class='percent-number'>
        #{cpu}
        </div>
      </div>
    </div>
  """

  for process, i in processes
    [cpu, name, pid] = process.split(',')
    processesContainer.find(".process#{i+1}").html(renderProcess(cpu, name, pid))

