$CoreOnly = $true
. "$PSScriptRoot\img.ps1"

# die-cut character stickers
[Img]::Key("$A\g1_cover_walk.jpg", 140,40,570,1095, "$O\st_walk.png")
[Img]::Key("$A\g13_growth.jpg", 65,25,715,1100, "$O\st_growth.png")
[Img]::Key("$A\g2_growing.jpg", 170,10,990,700, "$O\st_growing.png")
[Img]::Key("$A\g5_personas.jpg", 195,35,410,640, "$O\st_persona_girl.png")
[Img]::Key("$A\g5_personas.jpg", 675,35,415,640, "$O\st_persona_mom.png")

# scene sources with unwanted edges removed
[Img]::Crop("$A\g7_workshop.jpg", 0,0,1075,720, 1075,720, $false, "$O\src_workshop.jpg")
[Img]::Crop("$A\g8_market.jpg", 0,0,1050,720, 1050,720, $false, "$O\src_market.jpg")

# pillar badges
[Img]::Circle("$A\s11_flagship_wide.jpg", 975,520,185, 400, "$O\av_products.png")
[Img]::Circle("$A\lila_girl_sheet.jpg", 1000,215,160, 400, "$O\av_knowledge.png")
[Img]::Circle("$A\s16_panel_together.jpg", 662,260,255, 400, "$O\av_talk.png")
'done2'
