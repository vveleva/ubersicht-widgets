#-----------------------------------------------------------------------#

# OS Version Pro for Übersicht

# Redesigned Aug 2021 by Velina V Veleva

# Show or hide the version build information in the widget
showBuild = 'true'

#-----------------------------------------------------------------------#

command: "system_profiler SPSoftwareDataType | awk '{ if((/System Version/) && (/OS X/)) { print $3$4, $5, $6 }
  else if (/System Version/) { print $3, $4, $5 } }'"

refreshFrequency: 86400000 # Update every 24 hrs

style: """
  mainColor = #eaeaea
  percentBorderColor = #eaeaea33
  statusColor = #eaeaeaaa

  top: 20px
  left: 30px
  font-family: Avenir Next
  color: mainColor

  div
    display: block
    border-radius 5px
    font-size: 16px
    font-weight: 400
    padding: 4px 8px 4px 6px

    &:after
      content: ''
      position: absolute
      left: 0
      top: -14px
      font-size: 10px
      font-weight: 500
      color: mainColor

  .osName
    font-size: 14px
    font-weight: 600
    color: mainColor
    margin-left: 5px

  .osRelease
    font-size: 14px
    font-weight: 400
    color: mainColor
    margin-left: 5px

  img
    height: 60px
    width: 60px
    margin-bottom: -33px

  .osVersion
    padding: 0
    margin: 0px
    margin-left: 70px
    font-size: 11px
    font-weight: 400
    max-width: 100%
    color: mainColor
    text-overflow: ellipsis
    text-shadow: none

  .osBuild
    color: statusColor
    margin-left: 5px
"""

render: -> """
  <div>
    <img id="osIcon" src="vvv-os_version.widget/icons/mac_os.png">
    <a class='osName'>
      <a class='osRelease'>
      <span class='osBuild' />
    </a>
      <p class='osVersion'></p>
  </div>
"""

update: (output, domEl) ->
  [osName, osVersion, osBuild] = output.split(' ')
  div = $(domEl)

  switch
    when osVersion.substr(0, 5) == "11.4"
      document.getElementById("osIcon").src = "vvv-os_version.widget/icons/big_sur.png"
      osRelease = 'Big Sur'

  if (osName == 'OSX')
    osName = "#{osName.substr(0, 2)} #{osName.substr(2, 1)}"

  if (osName != '')
    div.find('.osName').html(osName)
    div.find('.osRelease').html(osRelease)
    div.find('.osVersion').html("Version #{osVersion}")
    if showBuild == 'true'
      div.find('.osVersion').append("<span class='osBuild'>#{osBuild}</span>")
  else
    div.find('.osVersion').html('OS info is not available')

