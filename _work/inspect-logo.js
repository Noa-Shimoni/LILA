const fs = require("fs");
const zlib = require("zlib");
const buf = fs.readFileSync("public/logo.png");
let o = 8;
const idats = [];
let w = 0;
let h = 0;
let color = 0;
while (o < buf.length) {
  const len = buf.readUInt32BE(o);
  const type = buf.toString("ascii", o + 4, o + 8);
  const data = buf.subarray(o + 8, o + 8 + len);
  if (type === "IHDR") {
    w = data.readUInt32BE(0);
    h = data.readUInt32BE(4);
    color = data[9];
  }
  if (type === "IDAT") idats.push(data);
  if (type === "IEND") break;
  o += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idats));
const bpp = color === 6 ? 4 : 3;
const stride = w * bpp;
const out = Buffer.alloc(h * stride);
let p = 0;
function paeth(left, up, ul) {
  const pa = left + up - ul;
  const paL = Math.abs(pa - left);
  const paU = Math.abs(pa - up);
  const paUL = Math.abs(pa - ul);
  if (paL <= paU && paL <= paUL) return left;
  if (paU <= paUL) return up;
  return ul;
}
for (let y = 0; y < h; y++) {
  const filter = raw[p++];
  const row = out.subarray(y * stride, (y + 1) * stride);
  const prev = y === 0 ? Buffer.alloc(stride) : out.subarray((y - 1) * stride, y * stride);
  const src = raw.subarray(p, p + stride);
  p += stride;
  for (let i = 0; i < stride; i++) {
    const left = i >= bpp ? row[i - bpp] : 0;
    const up = prev[i];
    const ul = i >= bpp ? prev[i - bpp] : 0;
    const x = src[i];
    if (filter === 0) row[i] = x;
    else if (filter === 1) row[i] = (x + left) & 255;
    else if (filter === 2) row[i] = (x + up) & 255;
    else if (filter === 3) row[i] = (x + Math.floor((left + up) / 2)) & 255;
    else if (filter === 4) row[i] = (x + paeth(left, up, ul)) & 255;
    else row[i] = x;
  }
}
function px(x, y) {
  const i = (y * w + x) * bpp;
  return [out[i], out[i + 1], out[i + 2], bpp === 4 ? out[i + 3] : 255];
}
const samples = [
  [0, 0],
  [10, 10],
  [w - 1, 0],
  [0, h - 1],
  [Math.floor(w / 2), Math.floor(h / 2)],
  [80, 96],
  [160, 100],
];
for (const [x, y] of samples) {
  console.log(x, y, px(x, y).join(","));
}
let opaque = 0;
let trans = 0;
for (let i = 0; i < out.length; i += 4) {
  if (out[i + 3] < 16) trans++;
  else opaque++;
}
console.log(JSON.stringify({ opaque, trans, w, h }));
