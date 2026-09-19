# Rebuilds ../index.html (the WWL Whiskey Journal landing page) from the pristine
# Claude-artifact bundle (wwl-whiskey-journal.base.html) plus the runtime shim (shim.txt).
#
# Run this after editing shim.txt:
#     powershell -ExecutionPolicy Bypass -File build-landing.ps1
#
# The shim is injected verbatim just before the bundle's closing tags, inside the
# __bundler/template block. See README.md for the rules the shim must follow.
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$src  = Join-Path $root 'wwl-whiskey-journal.base.html'
$dst  = Join-Path (Split-Path $root -Parent) 'index.html'
$shimPath = Join-Path $root 'shim.txt'

# Build the backslash-bearing literals at runtime so nothing in this source file is a
# fragile escape sequence. $bs is a single backslash.
$bs = [char]92
$closeLiteral = '</script>'            # what the shim ends with
$closeEscaped = '<' + $bs + '/script>' # what it must become inside the template ( <\/script> )
$anchor = '<' + $bs + 'u002Fbody><' + $bs + 'u002Fhtml>'  # </body></html>

$html = [System.IO.File]::ReadAllText($src)
$shim = ([System.IO.File]::ReadAllText($shimPath)).Trim()

# The shim's own closing tag must not survive as a literal "</" inside the outer
# <script type="__bundler/template"> (it would close it and break the JSON string).
# Escape only that one closing tag; any other literal "</" in the shim is a bug.
$scriptCloses = ([regex]::Matches($shim, [regex]::Escape($closeLiteral))).Count
if ($scriptCloses -ne 1) { throw "Expected exactly 1 '</script>' in shim, found $scriptCloses - aborting." }
$shim = $shim.Replace($closeLiteral, $closeEscaped)
if ($shim.Contains('<' + '/')) { throw "Shim still contains a literal '</' after escaping - aborting. Use createElement, not innerHTML with closing tags." }

# The template's JSON string ends with the escaped closing tags; insert the shim before them.
$count = ([regex]::Matches($html, [regex]::Escape($anchor))).Count
if ($count -ne 1) { throw "Expected exactly 1 template-close anchor in the base bundle, found $count - aborting." }
if ($html.Contains($shim)) { throw "Shim already present in the base bundle - aborting (base should be pristine)." }

$new = $html.Replace($anchor, $shim + $anchor)
if ($new.Length -le $html.Length) { throw "Splice did not grow the file - aborting." }

# Match the export's encoding: UTF-8, no BOM.
$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($dst, $new, $enc)
Write-Host ("Wrote {0}  (base {1} + shim {2} = {3} bytes)" -f $dst, $html.Length, $shim.Length, $new.Length)
