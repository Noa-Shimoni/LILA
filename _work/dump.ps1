param([string]$file, [string]$out)
$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open($file, $true, $false, $false)
$sb = New-Object System.Text.StringBuilder
function hex($c){ $r=$c -band 0xFF; $g=($c -shr 8) -band 0xFF; $b=($c -shr 16) -band 0xFF; return ('#{0:X2}{1:X2}{2:X2}' -f $r,$g,$b) }
function dumpShape($sh, $ind){
  $t = ''
  if($sh.HasTextFrame -and $sh.TextFrame.HasText){ $t = $sh.TextFrame.TextRange.Text -replace "`r",' | ' ; if($t.Length -gt 70){$t=$t.Substring(0,70)} ; $f=$sh.TextFrame.TextRange.Font; $t = "[$($f.Name)/$($f.NameComplexScript) $($f.Size) b$($f.Bold) $(hex $f.Color.RGB)] $t" }
  $fill=''; try{ if($sh.Fill.Visible){ $fill = "fill:" + (hex $sh.Fill.ForeColor.RGB) + " t" + $sh.Fill.Type } }catch{}
  $ln=''; try{ if($sh.Line.Visible){ $ln = "line:" + (hex $sh.Line.ForeColor.RGB) + " w" + $sh.Line.Weight } }catch{}
  $ast=''; try{ $ast = $sh.AutoShapeType }catch{}
  [void]$sb.AppendLine(("{0}{1} '{2}' type{3} ast{4} [{5:N0},{6:N0},{7:N0},{8:N0}] {9} {10} {11}" -f $ind,$sh.ZOrderPosition,$sh.Name,$sh.Type,$ast,$sh.Left,$sh.Top,$sh.Width,$sh.Height,$fill,$ln,$t))
  if($sh.Type -eq 6){ foreach($c in $sh.GroupItems){ dumpShape $c ($ind+'    ') } }
  if($sh.HasTable){ [void]$sb.AppendLine("$ind  TABLE rows $($sh.Table.Rows.Count) cols $($sh.Table.Columns.Count)") }
}
foreach($s in $p.Slides){
  [void]$sb.AppendLine("=== SLIDE $($s.SlideIndex) layout:$($s.CustomLayout.Name) followMaster:$($s.FollowMasterBackground) bg:$(hex $s.Background.Fill.ForeColor.RGB)")
  foreach($sh in $s.Shapes){ dumpShape $sh '  ' }
}
$p.Close()
[IO.File]::WriteAllText($out, $sb.ToString(), [Text.Encoding]::UTF8)
