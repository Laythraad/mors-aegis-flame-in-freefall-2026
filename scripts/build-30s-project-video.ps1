param(
  [string]$InputDeck = (Join-Path $PSScriptRoot '../deliverables/presentation/releases/MORS_AEGIS_NASA_Space_Apps_Submission_7_Slides_AI_public_submission.pptx'),
  [string]$OutputVideo = (Join-Path $PSScriptRoot '../public/media/mors-aegis-30s.mp4'),
  [string]$WorkDirectory = (Join-Path $PSScriptRoot '../.presentation-build-alpha20')
)

$ErrorActionPreference = 'Stop'
$InputDeck = [IO.Path]::GetFullPath($InputDeck)
$OutputVideo = [IO.Path]::GetFullPath($OutputVideo)
$WorkDirectory = [IO.Path]::GetFullPath($WorkDirectory)
New-Item -ItemType Directory -Force -Path $WorkDirectory, (Split-Path -Parent $OutputVideo) | Out-Null
$audio = Join-Path $WorkDirectory 'mors-aegis-narration.wav'

Add-Type -AssemblyName System.Speech
$synth = [System.Speech.Synthesis.SpeechSynthesizer]::new()
$synth.SelectVoice('Microsoft David Desktop')
$synth.Rate = 1
$narration = @'
Meet MORS AEGIS: Flame in Freefall. We turn NASA combustion research into a clear, interactive guide to spacecraft fire safety. Explore real experiment records, compare oxygen, pressure, airflow, fuel, and gravity, and see why each condition matters. Our three-dimensional concepts show possible research and response systems; they are not flight-qualified hardware. The AI copilot searches the project evidence, calculates descriptive results, cites its sources, and explains uncertainty. MORS AEGIS connects data, physics, and design questions to help teams prepare safer future missions.
'@
$synth.SetOutputToWaveFile($audio)
$synth.Speak($narration)
$synth.Dispose()

$app = $null
$presentation = $null
try {
  $app = New-Object -ComObject PowerPoint.Application
  $app.Visible = -1
  $presentation = $app.Presentations.Open($InputDeck, $true, $false, $false)
  $slides = $presentation.Slides
  $duration = 30.0 / $slides.Count
  foreach ($slide in $slides) {
    $slide.SlideShowTransition.AdvanceOnClick = 0
    $slide.SlideShowTransition.AdvanceOnTime = -1
    $slide.SlideShowTransition.AdvanceTime = $duration
  }
  $first = $slides.Item(1)
  $sound = $first.Shapes.AddMediaObject2($audio, 0, -1, 0, 0, 1, 1)
  $sound.AnimationSettings.PlaySettings.PlayOnEntry = -1
  $sound.AnimationSettings.PlaySettings.HideWhileNotPlaying = -1
  $sound.AnimationSettings.PlaySettings.StopAfterSlides = $slides.Count
  $presentation.CreateVideo($OutputVideo, -1, 5, 1080, 30, 85)
  $deadline = (Get-Date).AddMinutes(8)
  do {
    Start-Sleep -Seconds 2
    $status = [int]$presentation.CreateVideoStatus
    if ((Get-Date) -gt $deadline) { throw 'PowerPoint video export timed out.' }
  } while ($status -in @(1, 2))
  if ($status -ne 3 -or -not (Test-Path -LiteralPath $OutputVideo)) { throw "PowerPoint video export failed with status $status." }
  $presentation.Close()
  $app.Quit()
  $file = Get-Item -LiteralPath $OutputVideo
  Write-Output "Video: $($file.FullName)"
  Write-Output "Bytes: $($file.Length)"
} finally {
  if ($presentation) { try { $presentation.Close() } catch {} }
  if ($app) { try { $app.Quit() } catch {} }
}
