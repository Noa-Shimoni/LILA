param([string]$a, [string]$b, [string]$out)
$pp = New-Object -ComObject PowerPoint.Application
$PA = $pp.Presentations.Open($a, $true, $false, $false)
$PB = $pp.Presentations.Open($b, $true, $false, $false)
$sb = New-Object System.Text.StringBuilder
function L($m){ [void]$sb.AppendLine($m) }
function Texts($sh){
  $t = @()
  if($sh.HasTable){ $tb=$sh.Table; for($r=1;$r -le $tb.Rows.Count;$r++){ for($c=1;$c -le $tb.Columns.Count;$c++){ $t += $tb.Cell($r,$c).Shape.TextFrame.TextRange.Text } } }
  elseif($sh.HasTextFrame){ $t += $sh.TextFrame.TextRange.Text }
  return ($t -join '||')
}
$errors=0; $checked=0; $hdiff=0
L "Slides: A=$($PA.Slides.Count) B=$($PB.Slides.Count)  Size A=$($PA.PageSetup.SlideWidth)x$($PA.PageSetup.SlideHeight) B=$($PB.PageSetup.SlideWidth)x$($PB.PageSetup.SlideHeight)"
if($PA.Slides.Count -ne $PB.Slides.Count){ $errors++ }
for($i=1;$i -le $PA.Slides.Count;$i++){
  $sa=$PA.Slides($i); $sbb=$PB.Slides($i)
  $listA=@(); foreach($x in $sa.Shapes){ $listA += $x }
  $listB=@(); foreach($x in $sbb.Shapes){ if($x.Name -notlike 'LILA_deco_*'){ $listB += $x } }
  $deco = $sbb.Shapes.Count - $listB.Count
  if($listA.Count -ne $listB.Count){ L "SLIDE $i shape count differs A=$($listA.Count) B=$($listB.Count)"; $errors++; continue }
  for($k=0;$k -lt $listA.Count;$k++){
    $x=$listA[$k]; $y=$listB[$k]; $checked++
    if($x.Name -ne $y.Name){ L "SLIDE $i #$k name $($x.Name) vs $($y.Name)"; $errors++ }
    if($x.Type -ne $y.Type){ L "SLIDE $i $($x.Name) type changed"; $errors++ }
    $ta=Texts $x; $tb2=Texts $y
    if($ta -ne $tb2){ L "SLIDE $i $($x.Name) TEXT CHANGED"; $errors++ }
    foreach($p in 'Left','Top','Width'){ if([Math]::Abs($x.$p - $y.$p) -gt 0.5){ L "SLIDE $i $($x.Name) $p $($x.$p) -> $($y.$p)"; $errors++ } }
    if([Math]::Abs($x.Height - $y.Height) -gt 0.5){ $hdiff++; L ("  (info) SLIDE {0} {1} autofit height {2:N1} -> {3:N1}" -f $i,$x.Name,$x.Height,$y.Height) }
    if($x.Rotation -ne $y.Rotation){ L "SLIDE $i $($x.Name) rotation changed"; $errors++ }
    if(($y.Left + $y.Width) -gt 961 -or ($y.Top + $y.Height) -gt 541){ if(-not (($x.Left + $x.Width) -gt 961 -or ($x.Top + $x.Height) -gt 541)){ L "SLIDE $i $($x.Name) NOW EXCEEDS SLIDE"; $errors++ } }
  }
  foreach($x in $sbb.Shapes){ if($x.Name -like 'LILA_deco_*'){ if($x.Left -lt -0.5 -or $x.Top -lt -0.5 -or ($x.Left+$x.Width) -gt 960.5 -or ($x.Top+$x.Height) -gt 540.5){ L "SLIDE $i deco $($x.Name) out of bounds"; $errors++ } } }
  L "slide $i ok-checked $($listA.Count) original shapes, $deco decorative added"
}
L "TOTAL shapes checked: $checked  errors: $errors  autofit-height-changes: $hdiff"
$PA.Close(); $PB.Close()
[IO.File]::WriteAllText($out, $sb.ToString(), [Text.Encoding]::UTF8)
