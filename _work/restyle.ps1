param([string]$src, [string]$dst)
$ErrorActionPreference = 'Continue'
$w = "C:\Users\mosh1\.cursor\projects\LILA\_work"

function ToRgb([string]$h){ $h=$h.TrimStart('#'); $r=[Convert]::ToInt32($h.Substring(0,2),16); $g=[Convert]::ToInt32($h.Substring(2,2),16); $b=[Convert]::ToInt32($h.Substring(4,2),16); return [int]($r + 256*$g + 65536*$b) }
function ToHex([int]$c){ return ('{0:X2}{1:X2}{2:X2}' -f ($c -band 0xFF), (($c -shr 8) -band 0xFF), (($c -shr 16) -band 0xFF)) }
function Mix([string]$a,[string]$b,[double]$t){ $x=@(); for($i=0;$i -lt 3;$i++){ $va=[Convert]::ToInt32($a.Substring($i*2,2),16); $vb=[Convert]::ToInt32($b.Substring($i*2,2),16); $x += [int][Math]::Round($va*(1-$t)+$vb*$t) }; return ('{0:X2}{1:X2}{2:X2}' -f $x[0],$x[1],$x[2]) }

# ---------- LILA palette (from STYLE moodboard) ----------
$INK='3B3150'; $BODY='4A4458'; $MUTED='766D82'; $MAUVE='B07D86'; $MAUVED='9E6672'
$LILAC='E8E2F3'; $ROSE='F4E3E6'; $PERI='E5E9F5'; $PEACH='F7E6DF'; $SAGE='E1ECE8'; $BUTTER='F8EFD6'; $WHITE='FFFFFF'
$SW_LILAC='D9D0EA'; $SW_ROSE='EDCBD1'; $SW_PERI='C9D0EA'; $SW_SAGE='C8DCD7'; $SW_BUTTER='F2DC9B'; $SW_PEACH='F2CBB8'

$fillMap = @{
 'F6DEE7'=$ROSE; 'E2D8F2'=$LILAC; 'F9EFF4'=$PERI; 'F6E7E4'=$PEACH; 'E7EEE6'=$SAGE; 'EBE2EF'=$LILAC;
 'F7F3F7'=$WHITE; 'FFFFFF'=$WHITE; 'EFE7F2'=$LILAC; 'E5EFF7'=$PERI; 'F7EBE8'=$PEACH; 'F7F2EB'=$BUTTER;
 'E2D7E8'='DDD5EE'; 'EFE9F2'='EAE5F4'; 'F2E0DC'='F4E2E2'; 'DEEAE0'=$SAGE; '593D5B'=$INK; 'C989A5'=$MAUVE; 'F1EDF1'='EDE8F3'
}
$textMap = @{
 '4F3653'=$INK; '5B415E'=$INK; '593D5B'=$INK;
 '483D4A'=$BODY; '363037'=$BODY; '302B31'=$BODY; '000000'=$BODY;
 '827385'=$MUTED; '776D77'=$MUTED; '746B75'=$MUTED; '6F6770'=$MUTED;
 'C989A5'=$MAUVED; '376382'='4C5A8C'; 'FFFFFF'='FFFFFF'
}

$FH='Segoe UI Semibold'; $FB='Segoe UI'; $FL='Segoe UI Semilight'
$script:inTable=$false

function StyleText($sh, [bool]$isTableHeader=$false){
  if(-not $sh.HasTextFrame){ return }
  if(-not $sh.TextFrame.HasText){ return }
  $tr = $sh.TextFrame.TextRange
  $origLines = $tr.Lines().Count
  $origW = $tr.BoundWidth
  $noWrap = ($sh.TextFrame.WordWrap -ne -1)
  $minScale = 0.85; if($isTableHeader -or $script:inTable){ $minScale = 0.76 }; if($noWrap){ $minScale = 0.8 }
  $n = $tr.Runs().Count
  $sizes=@()
  for($i=1;$i -le $n;$i++){
    $r = $tr.Runs($i,1); $f=$r.Font
    $size=$f.Size; $bold=($f.Bold -eq -1); $sizes += $size
    $col = ToHex $f.Color.RGB
    if($size -ge 24){ $name=$FH; if($bold){ $f.Bold=0 } } elseif($bold){ $name=$FB } elseif($size -ge 15){ $name=$FL } else { $name=$FB }
    $f.Name=$name; $f.NameComplexScript=$name; $f.NameOther=$name
    if($isTableHeader){ $f.Color.RGB = ToRgb 'FFFFFF'; continue }
    if($size -ge 24 -and @('000000','483D4A','363037','302B31') -contains $col){ $f.Color.RGB = ToRgb $INK }
    elseif($textMap.ContainsKey($col)){ $f.Color.RGB = ToRgb $textMap[$col] }
  }
  FitLines $tr $origLines $sizes $minScale $noWrap $origW
}

function FitLines($tr, [int]$origLines, $sizes, [double]$minScale, [bool]$noWrap, [double]$origW){
  $scale=1.0
  while((($tr.Lines().Count -gt $origLines) -or ($noWrap -and $tr.BoundWidth -gt $origW*1.01)) -and $scale -gt $minScale){
    $scale -= 0.03
    $n=$tr.Runs().Count
    for($i=1;$i -le $n -and $i -le $sizes.Count;$i++){ $tr.Runs($i,1).Font.Size = [Math]::Round($sizes[$i-1]*$scale*2)/2 }
  }
}

function MidWordBreak($tr){
  $n=$tr.Lines().Count; if($n -le 1){ return $false }
  $txt=$tr.Text
  for($i=1;$i -lt $n;$i++){
    $ln=$tr.Lines($i,1); $end=$ln.Start+$ln.Length-1
    if($end -ge $txt.Length){ continue }
    $a=$txt[$end-1]; $b=$txt[$end]
    if(-not [char]::IsWhiteSpace($a) -and -not [char]::IsWhiteSpace($b) -and [char]::IsLetter($a) -and [char]::IsLetter($b)){ return $true }
  }
  return $false
}

function SoftShadow($sh){
  try{ $s=$sh.Shadow; $s.Visible=-1; $s.Style=2; $s.ForeColor.RGB=(ToRgb '4A3D66'); $s.Transparency=0.88; $s.Blur=16; $s.OffsetX=0; $s.OffsetY=5; $s.Size=100 }catch{}
}
function NoShadow($sh){ try{ $sh.Shadow.Visible=0 }catch{} }

function Deco($slide, [int]$shapeType, [double]$l,[double]$t,[double]$wd,[double]$ht, [string]$fill, [string]$name){
  $s=$slide.Shapes.AddShape($shapeType,$l,$t,$wd,$ht)
  $s.Name = "LILA_deco_$name"
  $s.Fill.Visible=-1; $s.Fill.Solid(); $s.Fill.ForeColor.RGB=(ToRgb $fill); $s.Line.Visible=0; NoShadow $s
  if($s.HasTextFrame){ $s.TextFrame.TextRange.Text='' }
  return $s
}
function Radius($sh, [double]$R){ try{ $m=[Math]::Min($sh.Width,$sh.Height); if($m -le 0){return}; $sh.Adjustments.Item(1)=[Math]::Min(0.5,$R/$m) }catch{} }

$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open($src, $true, $false, $false)
"opened: $($p.FullName) slides $($p.Slides.Count)"
# record original geometry of every shape (restored exactly at the end)
$geo=@{}
$rowH=@{}
foreach($s in $p.Slides){ $k=0; foreach($sh in $s.Shapes){ $k++; $geo["$($s.SlideIndex)/$k"] = @($sh.Left,$sh.Top,$sh.Width,$sh.Height)
  if($sh.HasTable){ $hs=@(); for($r=1;$r -le $sh.Table.Rows.Count;$r++){ $hs += $sh.Table.Rows($r).Height }; $rowH["$($s.SlideIndex)/$k"]=$hs } } }


# ---------- theme: colors + fonts so new content stays on-brand ----------
try{
  $th = $p.SlideMaster.Theme
  $cs = $th.ThemeColorScheme
  $cols = @($INK,'FFFFFF','4A4458','FBF7F1','7D6EA8',$MAUVE,'8C98C4','8FB0A8','D9B65C','C98F78','7D6EA8',$MAUVED)
  for($i=1;$i -le 12;$i++){ $cs.Colors($i).RGB = ToRgb $cols[$i-1] }
  $fs = $th.ThemeFontScheme
  $fs.MajorFont.Item(1).Name=$FH; $fs.MinorFont.Item(1).Name=$FB
  $fs.MajorFont.Item(3).Name=$FH; $fs.MinorFont.Item(3).Name=$FB
}catch{ "theme: $_" }
try{ $p.SlideMaster.Background.Fill.UserPicture("$w\bg_content.jpg") }catch{ "master bg: $_" }

$coverSlides=@(1,24); $dataSlides=@(5,6,11,12,13,14,16,21,22,23)



foreach($s in $p.Slides){
  $idx=$s.SlideIndex
  $s.FollowMasterBackground = 0
  if($coverSlides -contains $idx){ $bg="bg_cover.jpg" } elseif($dataSlides -contains $idx){ $bg="bg_data.jpg" } else { $bg="bg_content.jpg" }
  $s.Background.Fill.UserPicture("$w\$bg")

  $shapes=@(); foreach($sh in $s.Shapes){ $shapes += $sh }
  foreach($sh in $shapes){
    try{
      $nm=$sh.Name
      # --- tables ---
      if($sh.HasTable){
        $script:inTable=$true
        $tb=$sh.Table; $rows=$tb.Rows.Count; $colsN=$tb.Columns.Count
        for($r=1;$r -le $rows;$r++){
          $first = $tb.Cell($r,1).Shape
          $totalRow = $false
          for($c=1;$c -le $colsN;$c++){ $ts=$tb.Cell($r,$c).Shape; if($ts.TextFrame.HasText -and $ts.TextFrame.TextRange.Font.Bold -eq -1){ $totalRow=$true } }
          for($c=1;$c -le $colsN;$c++){
            $cell=$tb.Cell($r,$c); $cs2=$cell.Shape
            if($r -eq 1){ $fc=$INK } elseif($totalRow){ $fc=$ROSE } elseif(($r % 2) -eq 0){ $fc='FFFFFF' } else { $fc='F5F1F8' }
            if($idx -eq 14 -and $r -eq 2){ $fc='EDE7F6' }
            $cs2.Fill.Visible=-1; $cs2.Fill.Solid(); $cs2.Fill.ForeColor.RGB=(ToRgb $fc); $cs2.Fill.Transparency=0
            foreach($bi in 1,2,3,4){ try{ $bd=$cell.Borders.Item($bi); $bd.Visible=-1; $bd.ForeColor.RGB=(ToRgb 'E4DCEA'); $bd.Weight=0.75 }catch{} }
            StyleText $cs2 ($r -eq 1)
            if($idx -eq 14 -and $r -eq 2 -and $cs2.TextFrame.HasText){ $cs2.TextFrame.TextRange.Font.Color.RGB=(ToRgb $INK) }
          }
        }
        $script:inTable=$false
        continue
      }
      # --- pictures: untouched ---
      if($sh.Type -eq 13){ continue }
      # --- connectors / lines (slide 15 axes) ---
      if($sh.Connector -eq -1 -or $sh.Type -eq 9){
        $sh.Line.ForeColor.RGB=(ToRgb '8C7FA8'); $sh.Line.Weight=1.5; NoShadow $sh; continue
      }
      $ast=$sh.AutoShapeType
      $fillHex=$null; try{ if($sh.Fill.Visible -eq -1){ $fillHex = ToHex $sh.Fill.ForeColor.RGB } }catch{}

      if($ast -eq 9 -and $nm -like 'Oval*'){
        # soft brand circles
        $sh.Line.Visible=0; NoShadow $sh
        if($fillHex -eq 'F6DEE7'){ $sh.Fill.ForeColor.RGB=(ToRgb 'F1D9DE'); $sh.Fill.BackColor.RGB=(ToRgb 'F9EDE6'); $sh.Fill.TwoColorGradient(3,1) }
        elseif($sh.Width -lt 200 -and $idx -eq 1 -and $sh.Left -gt 600){ $sh.Fill.ForeColor.RGB=(ToRgb 'D3DAEE'); $sh.Fill.BackColor.RGB=(ToRgb 'EDEFF8'); $sh.Fill.TwoColorGradient(3,1) }
        else { $sh.Fill.ForeColor.RGB=(ToRgb 'DCD4EE'); $sh.Fill.BackColor.RGB=(ToRgb 'EEEAF6'); $sh.Fill.TwoColorGradient(4,1) }
        $sh.Fill.Transparency=0
        continue
      }
      if($ast -eq 33){ # block arrows (slide 20)
        $sh.Fill.Solid(); $sh.Fill.ForeColor.RGB=(ToRgb $MAUVE); $sh.Line.Visible=0; NoShadow $sh; continue
      }
      if($ast -eq 5 -and $fillHex){
        $isBar = ($sh.Height -le 10)
        $isAccent = ($sh.Width -le 45 -and $sh.Height -le 6)
        if($isAccent){ $sh.Fill.Solid(); $sh.Fill.ForeColor.RGB=(ToRgb $MAUVE); $sh.Line.Visible=0; NoShadow $sh; $sh.Adjustments.Item(1)=0.5; continue }
        if($isBar){
          $sh.Line.Visible=0; NoShadow $sh; $sh.Adjustments.Item(1)=0.5
          if($fillHex -eq '5B415E'){ if($sh.Left -lt 480){ $nf='7D6EA8' } else { $nf=$MAUVE } } elseif($fillMap.ContainsKey($fillHex)){ $nf=$fillMap[$fillHex] } else { $nf=$fillHex }
          $sh.Fill.Solid(); $sh.Fill.ForeColor.RGB=(ToRgb $nf)
          StyleText $sh; continue
        }
        # cards
        if($fillMap.ContainsKey($fillHex)){ $nf=$fillMap[$fillHex] } else { $nf=$fillHex }
        $sh.Fill.Solid(); $sh.Fill.ForeColor.RGB=(ToRgb $nf); $sh.Fill.Transparency=0
        if($nf -eq $INK){ $sh.Line.Visible=0 } else {
          $sh.Line.Visible=-1; $sh.Line.ForeColor.RGB=(ToRgb (Mix $nf '4A3D66' 0.07)); $sh.Line.Weight=0.75
        }
        SoftShadow $sh
        if([Math]::Min($sh.Width,$sh.Height) -le 35){ Radius $sh 100 } else { Radius $sh 14 }
        StyleText $sh
        continue
      }
      # text boxes and anything else
      StyleText $sh
      if($sh.Type -eq 17){ try{ if($sh.Fill.Visible -eq -1 -and $fillHex -and $fillMap.ContainsKey($fillHex)){ $sh.Fill.ForeColor.RGB=(ToRgb $fillMap[$fillHex]) } }catch{} }
    } catch { "slide $idx shape $($sh.Name): $_" }
  }

  # ---------- brand accents ----------
  $acc = $null; foreach($sh in $s.Shapes){ if($sh.Name -eq 'Rounded Rectangle 4' -and $sh.Width -le 45){ $acc=$sh } }
  if($acc){
    $a1 = Deco $s 5 ($acc.Left-14) $acc.Top 9 $acc.Height $SW_LILAC 'swatch1'; $a1.Adjustments.Item(1)=0.5
    $a2 = Deco $s 5 ($acc.Left-27) $acc.Top 9 $acc.Height $SW_PERI 'swatch2'; $a2.Adjustments.Item(1)=0.5
  }
  if($dataSlides -contains $idx -and @(5,6,11,12,13,16) -contains $idx){
    $t=$s.Shapes.Item(1)
    $v = Deco $s 5 925 ($t.Top+6) 3.5 ($t.Height-12) $MAUVE 'titlebar'; $v.Adjustments.Item(1)=0.5
  }
}

function Back($sh){ $sh.ZOrder(1) }   # msoSendToBack
function Swatches($s,[double]$y){
  $cols=@($SW_LILAC,$SW_ROSE,$SW_PERI,$SW_SAGE,$SW_BUTTER); $bw=26; $g=6; $tot=5*$bw+4*$g; $x0=480-$tot/2
  for($i=0;$i -lt 5;$i++){ $q=Deco $s 5 ($x0+$i*($bw+$g)) $y $bw 5 $cols[$i] "palette$i"; $q.Adjustments.Item(1)=0.5 }
}
function Divider($s,[double]$y,[double]$wd=56){ $d=Deco $s 1 (480-$wd/2) $y $wd 1.25 $MAUVE 'divider' }

# ---------- slide-specific design ----------
# 1 cover
$s=$p.Slides(1)
$t=$s.Shapes('TextBox 4').TextFrame.TextRange.Font; $t.Name='Vladimir Script'; $t.NameComplexScript='Vladimir Script'; $t.NameOther='Vladimir Script'; $t.Size=76; $t.Color.RGB=(ToRgb $MAUVE)
$s.Shapes('TextBox 5').TextFrame.TextRange.Font.Color.RGB=(ToRgb $INK)
Divider $s 254
Swatches $s 466

# 24 closing
$s=$p.Slides(24)
$t=$s.Shapes('TextBox 3').TextFrame.TextRange.Font; $t.Name='Vladimir Script'; $t.NameComplexScript='Vladimir Script'; $t.NameOther='Vladimir Script'; $t.Size=70; $t.Color.RGB=(ToRgb $MAUVE)
$s.Shapes('TextBox 4').TextFrame.TextRange.Font.Color.RGB=(ToRgb $INK)
Divider $s 270
Swatches $s 462

# 2 founder: polaroid frame + washi tape around the original photo (photo untouched)
$s=$p.Slides(2); $ph=$s.Shapes('Picture 14')
$fr = Deco $s 1 ($ph.Left-8) ($ph.Top-8) ($ph.Width+16) ($ph.Height+16) 'FFFFFF' 'polaroid'
SoftShadow $fr; $fr.Line.Visible=-1; $fr.Line.ForeColor.RGB=(ToRgb 'EFE8EE'); $fr.Line.Weight=0.5
while($fr.ZOrderPosition -ge $ph.ZOrderPosition){ $fr.ZOrder(3) }
$tp = Deco $s 1 ($ph.Left+$ph.Width/2-34) ($ph.Top-14) 68 18 $SW_ROSE 'tape'; $tp.Fill.Transparency=0.25; $tp.Rotation=-6
$s.Shapes('TextBox 12').TextFrame.TextRange.Font.Color.RGB=(ToRgb $BODY)

# 3 big idea: highlight pill gets a soft gradient
$s=$p.Slides(3); $b=$s.Shapes('Rounded Rectangle 9'); $b.Fill.ForeColor.RGB=(ToRgb 'E3DCF1'); $b.Fill.BackColor.RGB=(ToRgb 'F3E2E6'); $b.Fill.TwoColorGradient(1,1); $b.Line.Visible=0; Radius $b 100

# 4 problem: soft highlight band behind the opportunity line
$s=$p.Slides(4); $ob=$s.Shapes('TextBox 8')
$band = Deco $s 5 120 ($ob.Top-6) 720 ($ob.Height+12) $ROSE 'opportunity'; Radius $band 100
while($band.ZOrderPosition -gt 3){ $band.ZOrder(3) }

# 7: pills title / bottom
$s=$p.Slides(7)
foreach($sh in $s.Shapes){ if($sh.Name -eq 'Rounded Rectangle 7' -and $sh.Width -gt 500){ $sh.Fill.ForeColor.RGB=(ToRgb 'E6DFF2'); $sh.Fill.BackColor.RGB=(ToRgb 'F4E3E6'); $sh.Fill.TwoColorGradient(1,1); $sh.Fill.Transparency=0; Radius $sh 100 } }

# 8 vision
$s=$p.Slides(8); $s.Shapes('TextBox 7').TextFrame.TextRange.Font.Color.RGB=(ToRgb $INK)
Divider $s 248

# 9: bottom statement already mapped

# 10: flagship card gradient
$s=$p.Slides(10); $f=$s.Shapes('Rounded Rectangle 13'); $f.Fill.ForeColor.RGB=(ToRgb 'E6E0F3'); $f.Fill.BackColor.RGB=(ToRgb 'F6E6E8'); $f.Fill.TwoColorGradient(1,1)

# 11: product stage
$s=$p.Slides(11); $st=$s.Shapes('Rounded Rectangle 3'); $st.Fill.ForeColor.RGB=(ToRgb 'E9E3F3'); $st.Fill.BackColor.RGB=(ToRgb 'F6EAEA'); $st.Fill.TwoColorGradient(2,1)
$s.Shapes('TextBox 1').TextFrame.TextRange.Font.Color.RGB=(ToRgb $INK)

# 13: funnel tiers deepen toward top
$s=$p.Slides(13)
$s.Shapes('Rounded Rectangle 4').Fill.ForeColor.RGB=(ToRgb 'D9D0EC')
$s.Shapes('Rounded Rectangle 7').Fill.ForeColor.RGB=(ToRgb 'E6E0F3')
$s.Shapes('Rounded Rectangle 10').Fill.ForeColor.RGB=(ToRgb 'F4E1E3')

# 15: white chart panel behind positioning map (logos sit on white)
$s=$p.Slides(15)
$pn = Deco $s 5 88 78 662 400 'FFFFFF' 'chartpanel'; Radius $pn 16; SoftShadow $pn; $pn.Line.Visible=-1; $pn.Line.ForeColor.RGB=(ToRgb 'ECE5EE'); $pn.Line.Weight=0.75
while($pn.ZOrderPosition -gt 3){ $pn.ZOrder(3) }
foreach($nm in 'TextBox 13','TextBox 15'){ $x=$s.Shapes($nm).TextFrame.TextRange.Font; $x.Name=$FH; $x.NameComplexScript=$FH; $x.Color.RGB=(ToRgb $INK) }

# 16: journey - arrows in mauve, row strips
$s=$p.Slides(16)
foreach($sh in $s.Shapes){
  if($sh.HasTextFrame -and $sh.TextFrame.HasText -and $sh.Width -lt 20){ $sh.TextFrame.TextRange.Font.Color.RGB=(ToRgb $MAUVE) }
}
foreach($sh in @($s.Shapes | Where-Object { $_.Name -like 'Rounded Rectangle*' -and $_.Width -gt 120 -and $_.Width -lt 130 -and $_.Height -gt 120 })){
  if($sh.Top -lt 200){ $c=$SW_LILAC } else { $c=$SW_PERI }
  $q = Deco $s 5 ($sh.Left+$sh.Width/2-16) ($sh.Top+7) 32 3.5 $c 'rowstrip'; $q.Adjustments.Item(1)=0.5
}
$s.Shapes('Rounded Rectangle 11').Fill.ForeColor.RGB=(ToRgb 'E2E7F4')

# 19: roadmap timeline (dots aligned to the original lines; text untouched)
$s=$p.Slides(19)
$lines=@(); foreach($sh in $s.Shapes){ if($sh.HasTextFrame -and $sh.TextFrame.HasText -and $sh.Top -gt 140 -and $sh.Top -lt 400){ $lines += $sh } }
$lines = $lines | Sort-Object { $_.Top }
$y0=$lines[0].Top+$lines[0].Height/2; $y1=$lines[-1].Top+$lines[-1].Height/2
$ln = Deco $s 1 934.4 $y0 1.2 ($y1-$y0) $SW_LILAC 'timeline'
$k=0; $dc=@($SW_LILAC,$SW_ROSE,$SW_PERI,$SW_SAGE,$MAUVE)
foreach($l in $lines){ $cy=$l.Top+$l.Height/2; $d=Deco $s 9 930 ($cy-5) 10 10 $dc[$k] "dot$k"; $d.Line.Visible=-1; $d.Line.ForeColor.RGB=(ToRgb 'FFFFFF'); $d.Line.Weight=1.5; $k++ }

# 21-23 titles
foreach($i in 21,22,23){ $x=$p.Slides($i).Shapes('Title 11').TextFrame.TextRange.Font; $x.Color.RGB=(ToRgb $INK) }

# ---------- restore exact original geometry ----------
foreach($s in $p.Slides){
  $k=0
  $orig=@(); foreach($sh in $s.Shapes){ if($sh.Name -notlike 'LILA_deco_*'){ $orig += $sh } }
  foreach($sh in $orig){
    $k++; $g=$geo["$($s.SlideIndex)/$k"]
    if($sh.HasTable){
      if($s.SlideIndex -eq 14){ for($r=1;$r -le $sh.Table.Rows.Count;$r++){ for($c=1;$c -le $sh.Table.Columns.Count;$c++){ $tf=$sh.Table.Cell($r,$c).Shape.TextFrame; $tf.MarginLeft=3.5; $tf.MarginRight=3.5 } } }
      $hs=$rowH["$($s.SlideIndex)/$k"]
      for($r=1;$r -le $sh.Table.Rows.Count;$r++){ $sh.Table.Rows($r).Height=$hs[$r-1] }
      $tries=0
      while($sh.Height -gt $g[3]+1 -and $tries -lt 6){
        $tries++
        for($r=1;$r -le $sh.Table.Rows.Count;$r++){ for($c=1;$c -le $sh.Table.Columns.Count;$c++){ $tr=$sh.Table.Cell($r,$c).Shape.TextFrame.TextRange; for($i=1;$i -le $tr.Runs().Count;$i++){ $f=$tr.Runs($i,1).Font; $f.Size=[Math]::Round($f.Size*0.96*2)/2 } } }
        for($r=1;$r -le $sh.Table.Rows.Count;$r++){ $sh.Table.Rows($r).Height=$hs[$r-1] }
      }
      $fixed=0
      for($r=1;$r -le $sh.Table.Rows.Count;$r++){ for($c=1;$c -le $sh.Table.Columns.Count;$c++){
        $tr=$sh.Table.Cell($r,$c).Shape.TextFrame.TextRange
        if($tr.Length -eq 0){ continue }
        $steps=0
        while((MidWordBreak $tr) -and $steps -lt 3 -and $tr.Runs(1,1).Font.Size -gt 8){ $steps++; for($i=1;$i -le $tr.Runs().Count;$i++){ $f=$tr.Runs($i,1).Font; $f.Size=[double][Math]::Max([double]8.0,[double]($f.Size-0.5)) } }
        if($steps -gt 0){ $fixed++ }
      } }
      for($r=1;$r -le $sh.Table.Rows.Count;$r++){ $sh.Table.Rows($r).Height=$hs[$r-1] }
      "table slide $($s.SlideIndex): mid-word cells fixed $fixed; height $($sh.Height) (orig $($g[3])) after $tries shrink steps"
      $sh.Left=$g[0]; $sh.Top=$g[1]
      continue
    }
    if($sh.HasTextFrame){ try{ $sh.TextFrame.AutoSize=0 }catch{} }
    $sh.Left=$g[0]; $sh.Top=$g[1]; $sh.Width=$g[2]; $sh.Height=$g[3]
  }
}

try{ $p.SaveAs($dst, 24, -1) }catch{ "saveas embed failed: $_"; $p.SaveAs($dst, 24, 0) }
"saved to $($p.FullName)"
$p.Close()
