$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections.Generic;
public static class Img {
  static Bitmap Load(string p){ using(var b=new Bitmap(p)){ return new Bitmap(b); } }
  public static void Crop(string src,int x,int y,int w,int h,int ow,int oh,bool flip,string dst){
    var s=Load(src); var o=new Bitmap(ow,oh);
    using(var g=Graphics.FromImage(o)){ g.InterpolationMode=InterpolationMode.HighQualityBicubic; g.SmoothingMode=SmoothingMode.HighQuality; g.PixelOffsetMode=PixelOffsetMode.HighQuality;
      g.DrawImage(s,new Rectangle(0,0,ow,oh),new Rectangle(x,y,w,h),GraphicsUnit.Pixel);}
    if(flip) o.RotateFlip(RotateFlipType.RotateNoneFlipX);
    Save(o,dst); s.Dispose(); o.Dispose();
  }
  public static void Circle(string src,int cx,int cy,int r,int size,string dst){
    var s=Load(src); var o=new Bitmap(size,size,PixelFormat.Format32bppArgb);
    using(var g=Graphics.FromImage(o)){ g.SmoothingMode=SmoothingMode.AntiAlias; g.InterpolationMode=InterpolationMode.HighQualityBicubic;
      using(var path=new GraphicsPath()){ path.AddEllipse(0,0,size-1,size-1); g.SetClip(path);
        g.DrawImage(s,new Rectangle(0,0,size,size),new Rectangle(cx-r,cy-r,2*r,2*r),GraphicsUnit.Pixel);} }
    Save(o,dst); s.Dispose(); o.Dispose();
  }
  static bool Greenish(Color c){ int m=Math.Max(c.R,c.B); return c.G-m>28 && c.G>55; }
  public static void Key(string src,int x,int y,int w,int h,string dst){
    var full=Load(src); var s=full.Clone(new Rectangle(x,y,w,h),PixelFormat.Format32bppArgb); full.Dispose();
    int W=s.Width,H=s.Height; var bg=new bool[W,H]; var q=new Queue<Point>();
    for(int i=0;i<W;i++){ q.Enqueue(new Point(i,0)); q.Enqueue(new Point(i,H-1)); }
    for(int j=0;j<H;j++){ q.Enqueue(new Point(0,j)); q.Enqueue(new Point(W-1,j)); }
    var px=new Color[W,H]; for(int i=0;i<W;i++) for(int j=0;j<H;j++) px[i,j]=s.GetPixel(i,j);
    while(q.Count>0){ var p=q.Dequeue(); if(p.X<0||p.Y<0||p.X>=W||p.Y>=H) continue; if(bg[p.X,p.Y]) continue;
      if(!Greenish(px[p.X,p.Y])) continue; bg[p.X,p.Y]=true;
      q.Enqueue(new Point(p.X+1,p.Y)); q.Enqueue(new Point(p.X-1,p.Y)); q.Enqueue(new Point(p.X,p.Y+1)); q.Enqueue(new Point(p.X,p.Y-1)); }
    var seen=new bool[W,H];
    for(int i0=0;i0<W;i0++) for(int j0=0;j0<H;j0++){
      if(bg[i0,j0]||seen[i0,j0]||!Greenish(px[i0,j0])) continue;
      var comp=new List<Point>(); var cq=new Queue<Point>(); cq.Enqueue(new Point(i0,j0)); seen[i0,j0]=true;
      while(cq.Count>0){ var p=cq.Dequeue(); comp.Add(p);
        foreach(var d in new Point[]{new Point(1,0),new Point(-1,0),new Point(0,1),new Point(0,-1)}){ int a=p.X+d.X,b=p.Y+d.Y;
          if(a<0||b<0||a>=W||b>=H||seen[a,b]||bg[a,b]||!Greenish(px[a,b])) continue; seen[a,b]=true; cq.Enqueue(new Point(a,b)); } }
      if(comp.Count>400) foreach(var p in comp) bg[p.X,p.Y]=true;
    }
    var o=new Bitmap(W,H,PixelFormat.Format32bppArgb);
    for(int i=0;i<W;i++) for(int j=0;j<H;j++){
      if(bg[i,j]){ o.SetPixel(i,j,Color.FromArgb(0,255,255,255)); continue; }
      var c=px[i,j]; int n=0;
      for(int dx=-1;dx<=1;dx++) for(int dy=-1;dy<=1;dy++){ int a=i+dx,b=j+dy; if(a>=0&&b>=0&&a<W&&b<H&&bg[a,b]) n++; }
      if(n>0){ int m=Math.Max(c.R,c.B); int g2=Math.Min((int)c.G,Math.Max(m,(c.R+c.B)/2+10)); int al=255-n*22;
        o.SetPixel(i,j,Color.FromArgb(Math.Max(60,al),c.R,g2,c.B)); }
      else o.SetPixel(i,j,c);
    }
    Save(o,dst); s.Dispose(); o.Dispose();
  }
  static void Save(Bitmap b,string dst){ if(dst.EndsWith(".png")) b.Save(dst,ImageFormat.Png); else {
      var enc=Array.Find(ImageCodecInfo.GetImageEncoders(),e=>e.MimeType=="image/jpeg"); var ep=new EncoderParameters(1);
      ep.Param[0]=new EncoderParameter(System.Drawing.Imaging.Encoder.Quality,92L); b.Save(dst,enc,ep);} }
}
"@

$A = 'C:\Users\mosh1\.cursor\projects\c-Users-mosh1-cursor-projects-LILA\assets'
$O = 'c:\Users\mosh1\.cursor\projects\LILA\_work\concept\assets'
if($CoreOnly){ return }
New-Item -ItemType Directory -Force $O | Out-Null

# story panels (pt size x4)
[Img]::Crop("$A\s6_research_scene.jpg", 330,128,950,221, 1308,304, $false, "$O\p6.jpg")
[Img]::Crop("$A\s11_flagship_wide.jpg", 0,222,1280,197, 1968,304, $false, "$O\p11.jpg")
[Img]::Crop("$A\s16_panel_mom.jpg", 200,88,1000,303, 1000,304, $false, "$O\p16a.jpg")
[Img]::Crop("$A\s16_panel_together.jpg", 90,62,1100,333, 1000,304, $false, "$O\p16b.jpg")

# character badges
[Img]::Circle("$A\lila_mom_sheet.jpg", 700,195,128, 400, "$O\av_mom.png")
[Img]::Circle("$A\lila_girl_sheet.jpg", 700,185,128, 400, "$O\av_girl.png")

# die-cut stickers
[Img]::Key("$A\s16_hug_sticker.jpg", 0,0,1024,1024, "$O\st_hug.png")
$B = "$A\botanical_stickers.jpg"
[Img]::Key($B, 75,30,200,415, "$O\st_lavender.png")
[Img]::Key($B, 335,50,235,380, "$O\st_daisy.png")
[Img]::Key($B, 630,38,290,400, "$O\st_bouquet.png")
[Img]::Key($B, 960,62,235,355, "$O\st_euca.png")
[Img]::Key($B, 180,445,310,200, "$O\st_forget.png")
[Img]::Key($B, 560,475,550,150, "$O\st_garland.png")
[Img]::Key("$A\lila_girl_box_fullbody.jpg", 170,40,410,1215, "$O\st_girl_box.png")
'done'
