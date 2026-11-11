param([string]$src, [string]$dst)
$ErrorActionPreference = 'Stop'
$AS = 'c:\Users\mosh1\.cursor\projects\LILA\_work\concept\assets'
$GA = 'C:\Users\mosh1\.cursor\projects\c-Users-mosh1-cursor-projects-LILA\assets'
$pp = New-Object -ComObject PowerPoint.Application

function ToRgb([string]$hex){ $r=[Convert]::ToInt32($hex.Substring(0,2),16); $g=[Convert]::ToInt32($hex.Substring(2,2),16); $b=[Convert]::ToInt32($hex.Substring(4,2),16); return $r + 256*$g + 65536*$b }

function Shadow($s, [double]$blur=10, [double]$oy=3, [double]$tr=0.78){
  $s.Shadow.Visible = -1; $s.Shadow.ForeColor.RGB = (ToRgb '3B3150'); $s.Shadow.Transparency = $tr
  $s.Shadow.Blur = $blur; $s.Shadow.OffsetX = 0; $s.Shadow.OffsetY = $oy
}

function Tape($sl, [double]$cx, [double]$cy, [double]$w, [double]$h, [double]$rot, $hex, $name){
  $t = $sl.Shapes.AddShape(1, $cx-$w/2, $cy-$h/2, $w, $h)
  $t.Fill.ForeColor.RGB = (ToRgb $hex); $t.Fill.Transparency = 0.18; $t.Line.Visible = 0
  $t.Rotation = $rot
  $t.Shadow.Visible = -1; $t.Shadow.ForeColor.RGB = (ToRgb '3B3150'); $t.Shadow.Transparency = 0.9; $t.Shadow.Blur = 3; $t.Shadow.OffsetX = 0; $t.Shadow.OffsetY = 1
  $t.Name = "LILA_deco_tape_$name"
}

# story panel: illustrated print with white border, cover-cropped to the target box, taped at two corners
$script:tapeCols = @('D9D0EA','EDCBD1','C9D0EA','C8DCD7','F2DC9B')
$script:tc = 0
function Panel($sl, $file, [double]$x, [double]$y, [double]$w, [double]$h, $name, [double]$fx=0.5, [double]$fy=0.5, [bool]$tapes=$true){
  $pic = $sl.Shapes.AddPicture($file, 0, -1, $x, $y)
  $pic.LockAspectRatio = 0
  $w0 = $pic.Width; $h0 = $pic.Height; $ta = $w/$h; $ia = $w0/$h0
  if($ia -gt $ta){ $cut = $w0 - $h0*$ta; $pic.PictureFormat.CropLeft = $cut*$fx; $pic.PictureFormat.CropRight = $cut*(1-$fx) }
  else { $cut = $h0 - $w0/$ta; $pic.PictureFormat.CropTop = $cut*$fy; $pic.PictureFormat.CropBottom = $cut*(1-$fy) }
  $pic.Left = $x; $pic.Top = $y; $pic.Width = $w; $pic.Height = $h
  $pic.Line.Visible = -1; $pic.Line.ForeColor.RGB = (ToRgb 'FFFFFF'); $pic.Line.Weight = 3.5
  Shadow $pic 12 4 0.72
  $pic.Name = "LILA_deco_panel_$name"
  if($tapes){
    $c1 = $script:tapeCols[$script:tc % 5]; $c2 = $script:tapeCols[($script:tc+1) % 5]; $script:tc++
    Tape $sl ($x+8) ($y+4) 34 11 -38 $c1 "${name}_a"
    Tape $sl ($x+$w-8) ($y+$h-4) 34 11 -38 $c2 "${name}_b"
  }
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
$SlideAt = { param($i) $p.Slides.Item($i) }

# 1 cover: the two heroines walking together
$s = & $SlideAt 1
Sticker $s "$AS\st_walk.png" 24 168 175 'cover_walk'
Sticker $s "$AS\st_bouquet.png" 800 372 70 'cover_bouquet' 6

# 2 founder: the search that started it
$s = & $SlideAt 2
Panel $s "$GA\s16_panel_mom.jpg" 52 290 212 104 'founder_search' 0.5 0.1

# 3 big idea: a companion that grows with the girl
$s = & $SlideAt 3
Sticker $s "$AS\st_growing.png" 395 416 170 'growing'

# 4 problem: alone with the questions
$s = & $SlideAt 4
Panel $s "$GA\g3_problem.jpg" 180 304 600 100 'problem' 0.5 0.30

# 5 early puberty
$s = & $SlideAt 5
Panel $s "$GA\g4_mirror.jpg" 26 12 326 76 'mirror' 0.5 0.15

# 6 research
$s = & $SlideAt 6
Panel $s "$AS\p6.jpg" 26 12 284 72 'research' 0.55 0.5
$n=0; foreach($k in @(@{x=47;c='D9D0EA'}, @{x=341;c='EDCBD1'}, @{x=634;c='C8DCD7'})){ $n++; Tape $s ($k.x+138.5) 97 52 13 (-3 + 3*$n) $k.c "kpi$n" }
PaperClip $s 66 196 'chartL'
PaperClip $s 507 196 'chartR'
Sticker $s "$AS\st_lavender.png" 18 382 38 'lavender' -10
Sticker $s "$AS\st_daisy.png" 892 392 44 'daisy' 8

# 7 three pillars: a face for each pillar
$s = & $SlideAt 7
Badge $s "$AS\av_products.png" 202 335 58 'B07D86' 'products'
Badge $s "$AS\av_knowledge.png" 502 335 58 '9C8CC4' 'knowledge'
Badge $s "$AS\av_talk.png" 801 335 58 '8E98C8' 'talk'

# 8 vision: walking forward together
$s = & $SlideAt 8
Panel $s "$GA\g6_vision.jpg" 200 352 560 144 'vision' 0.5 0.55

# 9 personas
$s = & $SlideAt 9
Sticker $s "$AS\st_persona_girl.png" 92 312 74 'persona_girl'
Sticker $s "$AS\st_persona_mom.png" 512 312 75 'persona_mom'

# 10 products & services
$s = & $SlideAt 10
Panel $s "$GA\s11_flagship_scene.jpg" 26 14 244 84 'products' 0.5 0.57

# 11 flagship: content scaled 85% to free a hero column (approved flexible layout)
$s = & $SlideAt 11
$k = 0.85
function TX([double]$x){ 916 - (916-$x)*$k }
function TY([double]$y){ 110 + ($y-92)*$k }
$list = @(); foreach($x in $s.Shapes){ if($x.Top -ge 88){ $list += $x } }
foreach($x in $list){
  if($x.Type -eq 13){ $x.LockAspectRatio = 0 }
  $l=$x.Left; $t=$x.Top; $w=$x.Width; $h=$x.Height
  $x.Left = (TX $l); $x.Top = (TY $t); $x.Width = $w*$k; $x.Height = $h*$k
  if($x.HasTextFrame -and $x.TextFrame.HasText){ $tr=$x.TextFrame.TextRange; for($r=1;$r -le $tr.Runs().Count;$r++){ $f=$tr.Runs($r).Font; $f.Size = [double]([Math]::Round($f.Size*$k*2)/2) } }
}
Sticker $s "$AS\st_girl_box.png" 12 66 157 'hero_girl'
$n=0; foreach($c in @(@{x=45;y=104;c='D9D0EA'}, @{x=45;y=289;c='C8DCD7'}, @{x=732;y=104;c='C9D0EA'}, @{x=732;y=289;c='EDCBD1'})){ $n++; Tape $s (TX ($c.x+92)) (TY $c.y) 44 12 (@(-4,3,4,-3)[$n-1]) $c.c "card$n" }
Sticker $s "$AS\st_garland.png" (TX 391) (TY 444) (180*$k) 'garland'
Sticker $s "$AS\st_lavender.png" ((TX 256)-22) ((TY 92)-14) 36 'stage_lavender' -18
Sticker $s "$AS\st_euca.png" 862 462 46 'euca' 14

# 12 workshop
$s = & $SlideAt 12
Panel $s "$AS\src_workshop.jpg" 26 12 400 76 'workshop' 0.5 0.37

# 13 market
$s = & $SlideAt 13
Panel $s "$AS\src_market.jpg" 26 12 444 78 'market' 0.5 0.35

# 14 competition table: lost in the aisle
$s = & $SlideAt 14
Panel $s "$GA\g9_aisle.jpg" 26 12 474 90 'aisle' 0.5 0.18

# 15 positioning map: Lila stands beside her place on the map
$s = & $SlideAt 15
Sticker $s "$AS\st_girl_box.png" 800 128 125 'map_girl'

# 16 journey
$s = & $SlideAt 16
Panel $s "$AS\p16a.jpg" 26 12 238 72 'journey_search' 0.5 0.5 $false
Panel $s "$AS\p16b.jpg" 272 12 238 72 'journey_together' 0.5 0.5 $false
Tape $s 36 16 34 11 -38 'D9D0EA' 'p16a'
Tape $s 268 15 30 11 4 'EDCBD1' 'p16mid'
Tape $s 502 80 34 11 -38 'C9D0EA' 'p16b'
Badge $s "$AS\av_mom.png" 29 226 48 'B07D86' 'mom'
Badge $s "$AS\av_girl.png" 29 379 48 '8E98C8' 'girl'
Sticker $s "$AS\st_hug.png" 40 413 122 'hug'

# 17 validation so far
$s = & $SlideAt 17
Panel $s "$GA\g10_studio.jpg" 26 12 544 82 'studio' 0.5 0.24

# 18 go to market: the lead campaign
$s = & $SlideAt 18
Panel $s "$GA\g11_campaign.jpg" 26 10 404 70 'campaign' 0.5 0.25

# 19 roadmap: the path
$s = & $SlideAt 19
Panel $s "$GA\g12_path.jpg" 40 118 192 350 'path' 0.5 0.5

# 20 roadmap steps: gradual growth
$s = & $SlideAt 20
Sticker $s "$AS\st_growth.png" 792 160 160 'growth'

# 21 investment
$s = & $SlideAt 21
Panel $s "$GA\s11_flagship_scene.jpg" 822 150 122 180 'invest_box' 0.52 0.5
Sticker $s "$AS\st_bouquet.png" 848 356 64 'invest_bouquet' 6
Sticker $s "$AS\st_lavender.png" 52 400 34 'invest_lavender' -8

# 22 revenue: kits and workshops
$s = & $SlideAt 22
Panel $s "$GA\s11_flagship_wide.jpg" 170 352 648 140 'revenue' 0.5 0.43

# 23 expenses: packing and operations
$s = & $SlideAt 23
Panel $s "$GA\g14_packing_anime.jpg" 300 398 416 106 'packing' 0.5 0.25

# 24 closing: we are here with you
$s = & $SlideAt 24
Sticker $s "$AS\st_hug.png" 36 268 190 'closing_hug'
Sticker $s "$AS\st_bouquet.png" 806 396 66 'closing_bouquet' 6

$p.SaveAs($dst, 24, -1)
$p.Close()
'built full'
