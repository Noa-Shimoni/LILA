$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Bg {
  static double Clamp(double v){ return v<0?0:(v>1?1:v); }
  static double Smooth(double e0,double e1,double x){ double t=Clamp((x-e0)/(e1-e0)); return t*t*(3-2*t); }
  // kind: 0 cover, 1 content, 2 data
  public static void Make(string path, int kind, int seed){
    int W=1920,H=1080; var bmp=new Bitmap(W,H,PixelFormat.Format24bppRgb);
    var d=bmp.LockBits(new Rectangle(0,0,W,H),ImageLockMode.WriteOnly,PixelFormat.Format24bppRgb);
    byte[] buf=new byte[d.Stride*H]; var rnd=new Random(seed);
    // palette
    double[] cream = kind==2 ? new double[]{252,250,246} : new double[]{251,247,241};
    double[] wall = {205,210,228};   // soft periwinkle wall
    double[] lilac= {226,219,239};
    double[] rose = {244,226,229};
    for(int y=0;y<H;y++){
      for(int x=0;x<W;x++){
        double u=(double)x/W, v=(double)y/H;
        double r=cream[0], g=cream[1], b=cream[2];
        if(kind==0){
          // wall wash from left, fading by ~48%
          double w = 1-Smooth(0.0,0.50,u + 0.10*(v-0.5));
          w*=0.85;
          r=r*(1-w)+wall[0]*w; g=g*(1-w)+wall[1]*w; b=b*(1-w)+wall[2]*w;
          // rose glow top-right
          double dr=Math.Sqrt(Math.Pow((u-0.92)*1.78,2)+Math.Pow(v-0.05,2));
          double rw=0.55*(1-Smooth(0.0,0.75,dr));
          r=r*(1-rw)+rose[0]*rw; g=g*(1-rw)+rose[1]*rw; b=b*(1-rw)+rose[2]*rw;
        } else {
          double dl=Math.Sqrt(Math.Pow(u*1.78,2)+Math.Pow(1-v,2));
          double lw=(kind==1?0.55:0.30)*(1-Smooth(0.0,0.85,dl));
          r=r*(1-lw)+lilac[0]*lw; g=g*(1-lw)+lilac[1]*lw; b=b*(1-lw)+lilac[2]*lw;
          double dr=Math.Sqrt(Math.Pow((1-u)*1.78,2)+Math.Pow(v,2));
          double rw=(kind==1?0.45:0.25)*(1-Smooth(0.0,0.80,dr));
          r=r*(1-rw)+rose[0]*rw; g=g*(1-rw)+rose[1]*rw; b=b*(1-rw)+rose[2]*rw;
        }
        // diagonal sunbeam (warm light) : band around line x = 0.62 - 0.55*v (in u)
        double c = (kind==0? 0.58 : 0.40) - 0.55*v;
        double dist=Math.Abs(u-c);
        double beam = (kind==0?0.55:(kind==1?0.35:0.18)) * (1-Smooth(0.03,0.16,dist));
        double beam2 = (kind==0?0.30:(kind==1?0.18:0.0)) * (1-Smooth(0.0,0.05,Math.Abs(u-(c+0.22))));
        double bt=Clamp(beam+beam2);
        r=r*(1-bt)+255*bt; g=g*(1-bt)+252*bt; b=b*(1-bt)+246*bt;
        // paper grain
        double n=(rnd.NextDouble()-0.5)*(kind==2?4.0:6.0);
        int o=y*d.Stride+x*3;
        buf[o+2]=(byte)Math.Max(0,Math.Min(255,r+n));
        buf[o+1]=(byte)Math.Max(0,Math.Min(255,g+n));
        buf[o+0]=(byte)Math.Max(0,Math.Min(255,b+n));
      }
    }
    Marshal.Copy(buf,0,d.Scan0,buf.Length); bmp.UnlockBits(d);
    var enc = System.Array.Find(ImageCodecInfo.GetImageEncoders(), e => e.MimeType=="image/jpeg");
    var ep=new EncoderParameters(1); ep.Param[0]=new EncoderParameter(System.Drawing.Imaging.Encoder.Quality,92L);
    bmp.Save(path,enc,ep); bmp.Dispose();
  }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
$w="C:\Users\mosh1\.cursor\projects\LILA\_work"
[Bg]::Make("$w\bg_cover.jpg",0,7)
[Bg]::Make("$w\bg_content.jpg",1,11)
[Bg]::Make("$w\bg_data.jpg",2,13)
"done"
