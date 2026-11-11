param([string]$file, [string]$outDir)
New-Item -ItemType Directory -Force $outDir | Out-Null
$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open($file, $true, $false, $false)
foreach($s in $p.Slides){ $s.Export("$outDir\s$($s.SlideIndex).png","PNG",1280,720) }
$p.Close()
"exported $($p.Slides.Count)"
