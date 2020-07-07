---
layout: post-wide-width
title: "Command Archive"
subtitle: ""
date: 2020-07-06
author: KimJunHee
category: Setting
tags: archive command script
permalink: /test/command/archive/
finished: true
---

## Linux Command Archive

### Shell Script

#### 특정 프로세스 kill (awk는 여기서 공백으로 구분된 파일 출력들 중 2번 째를 추출해내는 역할을 함)

~~~bash
kill -9 `ps -ef | grep ffmpeg | awk '{print $2}'`
~~~

#### ffmpeg webm

~~~bash
ffmpeg -i ftp://user:1@192.168.10.2/sample.mp4 -threads 8 -cpu-used 5 -deadline realtime -an http://localhost:12390/feed1.ffm
~~~


#### local 환경에서 통신할 때 대역폭 한계 지정,  (가상 머신끼리, enp0s8은 인터페이스)

~~~bash
sudo tc qdisc add dev enp0s8 root handle 1:0 tbf rate 900Mbit burst 500k latency 1ms
sudo tc qdisc change dev enp0s8 root handle 1:0 tbf rate 900Mbit burst 500k latency 1ms
~~~


<br/>

### Shell Script Program

* [gcc, gpp compile version update](/assets/script/update-compiler.sh)
* [set-mysql.sh](/assets/script/set-mysql.sh)
* [set-ffserver.sh](/assets/script/set-ffserver.sh)
* [set-tomcat8.sh](/assets/script/set-tomcat8.sh)




<br/><br/>

## Windows Command Archive

### Batch

#### Basic Cheat Sheet

~~~batch
###################################################
# Run PowerShell Script
###################################################

@echo off
set BASE_PATH=C:\Users\kjh0121\Desktop\

powershell -executionpolicy bypass -File %BASE_PATH%/copy.ps1

###################################################
# Regular Expressions
###################################################

###################################################
# Flow Control
###################################################

###################################################
# Variables
###################################################

###################################################
# Functions
###################################################

###################################################
# Working with Modules
###################################################

###################################################
# Module Management
###################################################

###################################################
# Filesystem
###################################################

###################################################
# Windows Management Instrumentation (WMI) (Windows only)
###################################################

~~~



<br/>

### PowerShell Script

#### Basic Cheat Sheet

> PowerShell Cheat Sheet / Quick Reference

~~~powershell
Get-Command                                               # Retrieves a list of all the commands available to PowerShell
                                                          # (native binaries in $env:PATH + cmdlets / functions from PowerShell modules)
Get-Command -Module Microsoft*                            # Retrieves a list of all the PowerShell commands exported from modules named Microsoft*
Get-Command -Name *item                                   # Retrieves a list of all commands (native binaries + PowerShell commands) ending in "item"

Get-Help                                                  # Get all help topics
Get-Help -Name about_Variables                            # Get help for a specific about_* topic (aka. man page)
Get-Help -Name Get-Command                                # Get help for a specific PowerShell function
Get-Help -Name Get-Command -Parameter Module              # Get help for a specific parameter on a specific command


###################################################
# Operators
###################################################

$a = 2                                                    # Basic variable assignment operator
$a += 1                                                   # Incremental assignment operator
$a -= 1                                                   # Decrement assignment operator

$a -eq 0                                                  # Equality comparison operator
$a -ne 5                                                  # Not-equal comparison operator
$a -gt 2                                                  # Greater than comparison operator
$a -lt 3                                                  # Less than comparison operator

$FirstName = 'Trevor'
$FirstName -like 'T*'                                     # Perform string comparison using the -like operator, which supports the wildcard (*) character. Returns $true

###################################################
# Regular Expressions
###################################################

'Trevor' -match '^T\w*'                                   # Perform a regular expression match against a string value. # Returns $true and populates $matches variable
$matches[0]                                               # Returns 'Trevor', based on the above match

@('Trevor', 'Billy', 'Bobby') -match '^B'                 # Perform a regular expression match against an array of string values. Returns Billy, Bobby

###################################################
# Flow Control
###################################################

if (1 -eq 1) { }                                          # Do something if 1 is equal to 1

do { 'hi' } while ($false)                                # Loop while a condition is true (always executes at least once)

while ($false) { 'hi' }                                   # While loops are not guaranteed to run at least once
while ($true) { }                                         # Do something indefinitely
while ($true) { if (1 -eq 1) { break } }                  # Break out of an infinite while loop conditionally

for ($i = 0; $i -le 10; $i++) { Write-Host $i }           # Iterate using a for..loop
foreach ($item in (Get-Process)) { }                      # Iterate over items in an array

switch ('test') { 'test' { 'matched'; break } }           # Use the switch statement to perform actions based on conditions. Returns string 'matched'
switch -regex (@('Trevor', 'Daniel', 'Bobby')) {          # Use the switch statement with regular expressions to match inputs
  'o' { $PSItem; break }                                  # NOTE: $PSItem or $_ refers to the "current" item being matched in the array
}
switch -regex (@('Trevor', 'Daniel', 'Bobby')) {          # Switch statement omitting the break statement. Inputs can be matched multiple times, in this scenario.
  'e' { $PSItem }
  'r' { $PSItem }
}

###################################################
# Variables
###################################################


$a = 0                                                    # Initialize a variable
[int] $a = 'Trevor'                                       # Initialize a variable, with the specified type (throws an exception)
[string] $a = 'Trevor'                                    # Initialize a variable, with the specified type (doesn't throw an exception)

Get-Command -Name *varia*                                 # Get a list of commands related to variable management

Get-Variable                                              # Get an array of objects, representing the variables in the current and parent scopes
Get-Variable | ? { $PSItem.Options -contains 'constant' } # Get variables with the "Constant" option set
Get-Variable | ? { $PSItem.Options -contains 'readonly' } # Get variables with the "ReadOnly" option set

New-Variable -Name FirstName -Value Trevor
New-Variable FirstName -Value Trevor -Option Constant     # Create a constant variable, that can only be removed by restarting PowerShell
New-Variable FirstName -Value Trevor -Option ReadOnly     # Create a variable that can only be removed by specifying the -Force parameter on Remove-Variable

Remove-Variable -Name firstname                           # Remove a variable, with the specified name
Remove-Variable -Name firstname -Force                    # Remove a variable, with the specified name, that has the "ReadOnly" option set

###################################################
# Functions
###################################################

function add ($a, $b) { $a + $b }                         # A basic PowerShell function

function Do-Something {                                   # A PowerShell Advanced Function, with all three blocks declared: BEGIN, PROCESS, END
  [CmdletBinding]()]
  param ()
  begin { }
  process { }
  end { }
}

###################################################
# Working with Modules
###################################################

Get-Command -Name *module* -Module mic*core                 # Which commands can I use to work with modules?

Get-Module -ListAvailable                                   # Show me all of the modules installed on my system (controlled by $env:PSModulePath)
Get-Module                                                  # Show me all of the modules imported into the current session

$PSModuleAutoLoadingPreference = 0                          # Disable auto-loading of installed PowerShell modules, when a command is invoked

Import-Module -Name NameIT                                  # Explicitly import a module, from the specified filesystem path or name (must be present in $env:PSModulePath)
Remove-Module -Name NameIT                                  # Remove a module from the scope of the current PowerShell session

New-ModuleManifest                                          # Helper function to create a new module manifest. You can create it by hand instead.

New-Module -Name trevor -ScriptBlock {                      # Create an in-memory PowerShell module (advanced users)
  function Add($a,$b) { $a + $b } }

New-Module -Name trevor -ScriptBlock {                      # Create an in-memory PowerShell module, and make it visible to Get-Module (advanced users)
  function Add($a,$b) { $a + $b } } | Import-Module

###################################################
# Module Management
###################################################

Get-Command -Module PowerShellGet                           # Explore commands to manage PowerShell modules

Find-Module -Tag cloud                                      # Find modules in the PowerShell Gallery with a "cloud" tag
Find-Module -Name ps*                                       # Find modules in the PowerShell Gallery whose name starts with "PS"

Install-Module -Name NameIT -Scope CurrentUser -Force       # Install a module to your personal directory (non-admin)
Install-Module -Name NameIT -Force                          # Install a module to your personal directory (admin / root)
Install-Module -Name NameIT -RequiredVersion 1.9.0          # Install a specific version of a module

Uninstall-Module -Name NameIT                               # Uninstall module called "NameIT", only if it was installed via Install-Module

Register-PSRepository -Name <repo> -SourceLocation <uri>    # Configure a private PowerShell module registry
Unregister-PSRepository -Name <repo>                        # Deregister a PowerShell Repository


###################################################
# Filesystem
###################################################

New-Item -Path c:\test -ItemType Directory                  # Create a directory
mkdir c:\test2                                              # Create a directory (short-hand)

New-Item -Path c:\test\myrecipes.txt                        # Create an empty file
Set-Content -Path c:\test.txt -Value ''                     # Create an empty file
[System.IO.File]::WriteAllText('testing.txt', '')           # Create an empty file using .NET Base Class Library

Remove-Item -Path testing.txt                               # Delete a file
[System.IO.File]::Delete('testing.txt')                     # Delete a file using .NET Base Class Library

Copy $SRC_PATH $DST_PATH -Recurse -Force                    # Copy directory or file

###################################################
# Windows Management Instrumentation (WMI) (Windows only)
###################################################

Get-CimInstance -ClassName Win32_BIOS                       # Retrieve BIOS information
Get-CimInstance -ClassName Win32_DiskDrive                  # Retrieve information about locally connected physical disk devices
Get-CimInstance -ClassName Win32_PhysicalMemory             # Retrieve information about install physical memory (RAM)
Get-CimInstance -ClassName Win32_NetworkAdapter             # Retrieve information about installed network adapters (physical + virtual)
Get-CimInstance -ClassName Win32_VideoController            # Retrieve information about installed graphics / video card (GPU)

Get-CimClass -Namespace root\cimv2                          # Explore the various WMI classes available in the root\cimv2 namespace
Get-CimInstance -Namespace root -ClassName __NAMESPACE      # Explore the child WMI namespaces underneath the root\cimv2 namespace
~~~



#### Ansi Color

> 24-bit colors to your text using PowerShell and ANSI escape sequences

~~~powershell
while ($true) {
    $Red = Get-Random -SetSeed (Get-Date).Ticks.ToString().Substring(10,8) -Maximum 255
    $Green = Get-Random -SetSeed (Get-Date).Ticks.ToString().Substring(10,8) -Maximum 255
    $Blue = Get-Random -SetSeed (Get-Date).Ticks.ToString().Substring(10,8) -Maximum 255
    Write-Host -Object ("$([char]27)[38;2;{0};{1};{2}mtrevor" -f $Red, $Green, $Blue)
}
~~~



#### Get Wav Bit Depth

> Get WAV file bit depth using PowerShell

~~~powershell
# Create an empty Byte array, with a length of 1 byte
$Data = [System.Byte[]]::new(1)

# Open a FileStream to the specified file path
$Stream = [System.IO.File]::Open("$HOME/wav1.wav", [System.IO.FileMode]::Open)

# Seek to Byte 35
$null = $Stream.Seek(34, [System.IO.SeekOrigin]::Begin)

# Read a single byte, from the current position, into the specified Byte array
$null = $Stream.Read($Data, 0, 1)

# Close the FileStream
$Stream.Close()

# Return the Byte array
$Data
~~~



#### Get YouTube Video Runtime

> Retrieves your YouTube video run-time, in hours, using dependency-free PowerShell code

~~~powershell
$ErrorActionPreference = 'stop'

function Get-YouTubeChannel {
  [CmdletBinding()]
  param (
    [Parameter(Mandatory = $true)]
    [string] $Username,
    [Parameter(Mandatory = $true)]
    [string] $AccessToken
  )
  $Uri = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername={1}&access_token={0}' -f $AccessToken, $Username
  Invoke-RestMethod -Uri $Uri
}

function Get-YouTubePlaylistItems {
  [CmdletBinding()]
  [OutputType([String[]])]
  param (
    [Parameter(Mandatory = $true)]
    [string] $PlaylistId,
    [Parameter(Mandatory = $true)]
    [string] $AccessToken
  )

  $VideoIdList = [System.Collections.ArrayList]::new()
  $NextPageToken = ''
  
  do {
    $Result = Invoke-RestMethod -Uri ('https://www.googleapis.com/youtube/v3/playlistItems?pageToken={2}&part=contentDetails&maxResults=50&playlistId={1}&access_token={0}' -f $AccessToken, $PlaylistId, $NextPageToken)
    $NextPageToken = $Result.nextPageToken
    if ($NextPageToken) { Write-Verbose -Message $NextPageToken }
  
    foreach ($Video in $Result.items) {
      $null = $VideoIdList.Add($Video.contentDetails.videoId)
    }
  } while ($Result.nextPageToken)
  
  return $VideoIdList
}

function Get-YouTubeVideoDetail {
  [CmdletBinding()]
  param (
    [Parameter(Mandatory = $true)]
    [System.Collections.ArrayList] $Id,
    [Parameter(Mandatory = $true)]
    [string] $AccessToken
  )

  function Add-DurationSecondsProperty {
    [CmdletBinding()]
    param (
      [Parameter(ValueFromPipeline = $true)]
      $Object
    )
    process {
      $input | Add-Member -PassThru -MemberType ScriptProperty -Name DurationSeconds -Value {
        $RegEx = 'PT(?<Minutes>\d+)M(?<Seconds>\d+)S|PT(?<Seconds>\d+)S|PT(?<Minutes>\d+)M'
        $Matched = $this.contentDetails.duration -match $RegEx
        if ($Matched) {
          $Minutes = [int]$Matches['Minutes']
          $Seconds = [int]$Matches['Seconds']
          return ($Minutes*60) + $Seconds
        }
        else { return 0 }
      }
    }
  }

  $VideoDetailList = [System.Collections.ArrayList]::new()
  $NextPageToken = ''

  for ($i = 0; $i -lt $Id.Count; $i += 50) {
    $ItemCount = if (($Id.Count - $i) -gt 50) { 50 } else { $Id.Count - $i }
    Write-Verbose -Message $ItemCount
    $Uri = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&pageToken={2}&maxResults=50&id={1}&access_token={0}' -f $AccessToken, ($Id.GetRange($i, $ItemCount) -join ','), $NextPageToken
    Write-Verbose -Message $Uri
    $VideoDetailResult = Invoke-RestMethod -Uri $Uri
    $null = $VideoDetailList.AddRange(($VideoDetailResult.items | Add-DurationSecondsProperty))
    $NextPageToken = $VideoDetailResult.nextPageToken
  }

  return $VideoDetailList
}

# Use the Google oAuth Playground to obtain an access token.
# Make sure the token is generated, with the appropriate oAuth scope for YouTube Data API v3.
# I tested it with just this oAuth scope: https://www.googleapis.com/auth/youtube
$Token = 'PutYourAccessTokenHere'
$Username = 'PutYourYouTubeUsernameHere'

$Channel = Get-YouTubeChannel -Username $Username -AccessToken $Token
$VideoIdList = Get-YouTubePlaylistItems -PlaylistId $Channel.items[0].contentDetails.relatedPlaylists.uploads -AccessToken $Token
$VideoDetailResult = Get-YouTubeVideoDetail -Id $VideoIdList -AccessToken $Token -Verbose

# Result will be the number of hours of play-time
($VideoDetailResult.DurationSeconds | Measure-Object -Sum).Sum/60/60
~~~





<br/><br/>

## Command Archive Good Reference

* <https://github.com/jlevy/the-art-of-command-line>
* <https://gist.github.com/pcgeek86>
