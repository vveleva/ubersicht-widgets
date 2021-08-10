command: "dig +short myip.opendns.com @resolver1.opendns.com"

refreshFrequency: 43200000

style: """
  mainColor = #eaeaea
  percentBorderColor = #eaeaea33
  statusColor = #eaeaeaaa

  top: 390px
  left: 30px
  color: mainColor
  font-family: Helvetica Neue
  width: 270px
  font-size: 12px

  .ip_address
    color: statusColor
"""

render: -> """
  <div>
    PUBLIC IP
    <div class='ip_address'></div>
  </div>
"""

update: (output, domEl) ->
  $(domEl).find('.ip_address').html(output)

