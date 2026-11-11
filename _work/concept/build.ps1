param([string]$src, [string]$dst, [string]$origSubset, [string]$orig)
$ErrorActionPreference = 'Stop'
$AS = 'c:\Users\mosh1\.cursor\projects\LILA\_work\concept\assets'
$pp = New-Object -ComObject PowerPoint.Application

function ToRgb([string]$hex){ $r=[Convert]::ToInt32($hex.Substring(0,2),16); $g=[Convert]::ToInt32($hex.Substring(2,2),16); $b=[Convert]::ToInt32($hex.Substring(4,2),16); return $r + 256*$g + 65536*$b }

function Keep([object]$p, [int[]]$keep){
  for($i=$p.Slides.Count; $i -ge 1; $i--){ if($keep -notcontains $i){ $p.Slides($i).Delete() } }
}

function Shadow($s, [double]$blur=10, [double]$oy=3, [double]$tr=0.78){
  $s.Shadow.Visible = -1; $s.Shadow.ForeColor.RGB = (ToRgb '3B3150'); $s.Shadow.Transparency = $tr
  $s.Shadow.Blur = $blur; $s.Shadow.OffsetX = 0; $s.Shadow.OffsetY = $oy
}

# story panel: photo-print with white border, cover-cropped to the target box
function Panel($sl, $file, [double]$x, [double]$y, [double]$w, [double]$h, $name, [double]$fx=0.5, [double]$fy=0.5){
  $pic = $sl.Shapes.AddPicture($file, 0, -1, $x, $y)
  $pic.LockAspectRatio = 0
  $w0 = $pic.Width; $h0 = $pic.Height; $ta = $w/$h; $ia = $w0/$h0
  if($ia -gt $ta){ $cut = $w0 - $h0*$ta; $pic.PictureFormat.CropLeft = $cut*$fx; $pic.PictureFormat.CropRight = $cut*(1-$fx) }
  else { $cut = $h0 - $w0/$ta; $pic.PictureFormat.CropTop = $cut*$fy; $pic.PictureFormat.CropBottom = $cut*(1-$fy) }
  $pic.Left = $x; $pic.Top = $y; $pic.Width = $w; $pic.Height = $h
  $pic.Line.Visible = -1; $pic.Line.ForeColor.RGB = (ToRgb 'FFFFFF'); $pic.Line.Weight = 3.5
  Shadow $pic 12 4 0.72
  $pic.Name = "LILA_deco_$name"
  return $pic
}

function Tape($sl, [double]$cx, [double]$cy, [double]$w, [double]$h, [double]$rot, $hex, $name){
  $t = $sl.Shapes.AddShape(1, $cx-$w/2, $cy-$h/2, $w, $h)
  $t.Fill.ForeColor.RGB = (ToRgb $hex); $t.Fill.Transparency = 0.18; $t.Line.Visible = 0
  $t.Rotation = $rot
  $t.Shadow.Visible = -1; $t.Shadow.ForeColor.RGB = (ToRgb '3B3150'); $t.Shadow.Transparency = 0.9; $t.Shadow.Blur = 3; $t.Shadow.OffsetX = 0; $t.Shadow.OffsetY = 1
  $t.Name = "LILA_deco_tape_$name"
  return $t
}

function PaperClip($sl, [double]$x, [double]$y, $name){
  $gold = ToRgb 'C8A15A'
  $o = $sl.Shapes.AddShape(5, $x, $y, 10, 30); $o.Adjustments.Item(1) = 0.5
  $o.Fill.Visible = 0; $o.Line.ForeColor.RGB = $gold; $o.Line.Weight = 1.6
  $i = $sl.Shapes.AddShape(5, $x+2.2, $y+7, 5.6, 19); $i.Adjustments.Item(1) = 0.5
  $i.Fill.Visible = 0; $i.Line.ForeColor.RGB = $gold; $i.Line.Weight = 1.6
  $g = $sl.Shapes.Range([object[]]@($o.Name, $i.Name)).Group()
  $g.Rotation = -8
  $g.Shadow.Visible = -1; $g.Shadow.ForeColor.RGB = (ToRgb '3B3150'); $g.Shadow.Transparency = 0.82; $g.Shadow.Blur = 2; $g.Shadow.OffsetX = 1; $g.Shadow.OffsetY = 1
  $g.Name = "LILA_deco_clip_$name"
}

function Sticker($sl, $file, [double]$x, [double]$y, [double]$w, $name, [double]$rot=0){
  $pic = $sl.Shapes.AddPicture($file, 0, -1, $x, $y)
  $pic.LockAspectRatio = -1; $pic.Width = $w; $pic.Left = $x; $pic.Top = $y
  $pic.Rotation = $rot
  Shadow $pic 6 2 0.8
  $pic.Name = "LILA_deco_st_$name"
  return $pic
}

function Badge($sl, $file, [double]$cx, [double]$cy, [double]$d, $ringHex, $name){
  $ring = $sl.Shapes.AddShape(9, $cx-$d/2-3, $cy-$d/2-3, $d+6, $d+6)
  $ring.Fill.ForeColor.RGB = (ToRgb 'FFFFFF'); $ring.Line.ForeColor.RGB = (ToRgb $ringHex); $ring.Line.Weight = 1.25
  Shadow $ring 8 3 0.75
  $ring.Name = "LILA_deco_badge_ring_$name"
  $pic = $sl.Shapes.AddPicture($file, 0, -1, $cx-$d/2, $cy-$d/2, $d, $d)
  $pic.Name = "LILA_deco_badge_$name"
}

$p = $pp.Presentations.Open($src, $true, $false, $false)
Keep $p @(6, 11, 16)

# ---------- option B: flagship with light layout flexibility (content scaled to free a hero column) ----------
$p.Slides(2).Duplicate() | Out-Null
$sb = $p.Slides(3)
$k = 0.85
function TX([double]$x){ 916 - (916-$x)*$k }
function TY([double]$y){ 110 + ($y-92)*$k }
$list = @(); foreach($x in $sb.Shapes){ if($x.Top -ge 88){ $list += $x } }
foreach($x in $list){
  if($x.Type -eq 13){ $x.LockAspectRatio = 0 }
  $l=$x.Left; $t=$x.Top; $w=$x.Width; $h=$x.Height
  $x.Left = (TX $l); $x.Top = (TY $t); $x.Width = $w*$k; $x.Height = $h*$k
  if($x.HasTextFrame -and $x.TextFrame.HasText){ $tr=$x.TextFrame.TextRange; for($r=1;$r -le $tr.Runs().Count;$r++){ $f=$tr.Runs($r).Font; $f.Size = [double]([Math]::Round($f.Size*$k*2)/2) } }
}
Sticker $sb "$AS\st_girl_box.png" 12 66 157 'hero_girl' 0 | Out-Null
$n=0; foreach($c in @(@{x=45;y=104;c='D9D0EA'}, @{x=45;y=289;c='C8DCD7'}, @{x=732;y=104;c='C9D0EA'}, @{x=732;y=289;c='EDCBD1'})){ $n++; Tape $sb (TX ($c.x+92)) (TY $c.y) 44 12 (@(-4,3,4,-3)[$n-1]) $c.c "b_card$n" | Out-Null }
Sticker $sb "$AS\st_garland.png" (TX 391) (TY 444) (180*$k) 'b_garland' 0 | Out-Null
Sticker $sb "$AS\st_lavender.png" ((TX 256)-22) ((TY 92)-14) 36 'b_lavender' -18 | Out-Null
Sticker $sb "$AS\st_euca.png" 862 462 46 'b_euca' 14 | Out-Null

# ---------- research & results (orig slide 6) ----------
$s = $p.Slides(1)
Panel $s "$AS\p6.jpg" 26 12 284 72 'panel_research' 0.55 0.5 | Out-Null
Tape $s 34 16 34 11 -38 'D9D0EA' 'p6a' | Out-Null
Tape $s 302 80 34 11 -38 'EDCBD1' 'p6b' | Out-Null
$kpi = @(@{x=47;c='D9D0EA'}, @{x=341;c='EDCBD1'}, @{x=634;c='C8DCD7'})
$n=0; foreach($k in $kpi){ $n++; Tape $s ($k.x+138.5) 97 52 13 (-3 + 3*$n) $k.c "kpi$n" | Out-Null }
PaperClip $s 66 196 'chartL'
PaperClip $s 507 196 'chartR'
Sticker $s "$AS\st_lavender.png" 18 382 38 'lavender' -10 | Out-Null
Sticker $s "$AS\st_daisy.png" 892 392 44 'daisy' 8 | Out-Null

# ---------- flagship product (orig slide 11) ----------
$s = $p.Slides(2)
Panel $s "$AS\p11.jpg" 26 12 492 72 'panel_flagship' 0.5 0.45 | Out-Null
Tape $s 36 16 36 11 -38 'EDCBD1' 'p11a' | Out-Null
Tape $s 510 80 36 11 -38 'D9D0EA' 'p11b' | Out-Null
$cards = @(@{x=45;y=104;c='D9D0EA'}, @{x=45;y=289;c='C8DCD7'}, @{x=732;y=104;c='C9D0EA'}, @{x=732;y=289;c='EDCBD1'})
$n=0; foreach($c in $cards){ $n++; Tape $s ($c.x+92) $c.y 50 13 (@(-4,3,4,-3)[$n-1]) $c.c "card$n" | Out-Null }
Sticker $s "$AS\st_lavender.png" 230 72 40 'stage_lavender' -18 | Out-Null
Sticker $s "$AS\st_garland.png" 391 444 180 'stage_garland' 0 | Out-Null
Sticker $s "$AS\st_bouquet.png" 74 455 58 'bouquet' -6 | Out-Null
Sticker $s "$AS\st_euca.png" 832 458 52 'euca' 14 | Out-Null

# ---------- customer journey (orig slide 16) ----------
$s = $p.Slides(4)
Panel $s "$AS\p16a.jpg" 26 12 238 72 'panel_journey_search' 0.5 0.5 | Out-Null
Panel $s "$AS\p16b.jpg" 272 12 238 72 'panel_journey_together' 0.5 0.5 | Out-Null
Tape $s 36 16 34 11 -38 'D9D0EA' 'p16a' | Out-Null
Tape $s 268 15 30 11 4 'EDCBD1' 'p16mid' | Out-Null
Tape $s 502 80 34 11 -38 'C9D0EA' 'p16b' | Out-Null
Badge $s "$AS\av_mom.png" 29 226 48 'B07D86' 'mom'
Badge $s "$AS\av_girl.png" 29 379 48 '8E98C8' 'girl'
Sticker $s "$AS\st_hug.png" 40 413 122 'hug' 0 | Out-Null

$p.SaveAs($dst, 24)
$p.Slides(3).Delete()
$p.SaveAs(($origSubset -replace 'orig_subset','strict_subset'), 24)
$p.Close()

# original subset for verification
$o = $pp.Presentations.Open($orig, $true, $false, $false)
Keep $o @(6, 11, 16)
$o.SaveAs($origSubset, 24)
$o.Close()
'built'
