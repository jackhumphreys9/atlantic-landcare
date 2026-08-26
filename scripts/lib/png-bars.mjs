/**
 * Minimal PNG decoder, just enough to find solid black letterbox bars.
 *
 * Phone screenshots of photos come out at full screen height with black bands
 * above and below the image. No image library is available in this project, and
 * pulling one in for a build-time-only chore isn't worth the dependency, so we
 * decode the handful of bytes we actually need.
 *
 * Only handles 8-bit, non-interlaced PNGs — which is what iOS screenshots are.
 */

import { inflateSync } from "node:zlib";

const BLACK = 24; // channel value at or below this counts as black
const CHANNELS_BY_COLOR_TYPE = { 0: 1, 2: 3, 4: 2, 6: 4 };

export function decodePng(buffer) {
  let pos = 8; // skip the PNG signature
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString("ascii", pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + length);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error("interlaced PNG not supported");
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    pos += 12 + length; // length + type + data + crc
  }

  if (bitDepth !== 8) throw new Error(`unsupported bit depth: ${bitDepth}`);
  const channels = CHANNELS_BY_COLOR_TYPE[colorType];
  if (!channels) throw new Error(`unsupported color type: ${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const pixels = Buffer.alloc(height * stride);

  // Undo the per-scanline filter each row was encoded with.
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= channels ? prev[i - channels] : 0;
      let value = line[i];

      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = value & 0xff;
    }
  }

  return { width, height, channels, pixels };
}

/** True if essentially every sampled pixel in the row is black. */
function isBlackRow({ width, channels, pixels }, y) {
  const stride = width * channels;
  let checked = 0;
  let black = 0;
  for (let x = 0; x < width; x += 8) {
    const i = y * stride + x * channels;
    checked++;
    if (pixels[i] <= BLACK && pixels[i + 1] <= BLACK && pixels[i + 2] <= BLACK) black++;
  }
  return black / checked > 0.995;
}

/**
 * Returns the crop box excluding top and bottom black bars.
 * `top`/`bottom` are the bar thicknesses in pixels.
 */
export function findBars(image) {
  const { height } = image;

  let top = 0;
  while (top < height && isBlackRow(image, top)) top++;

  let lastContentRow = height - 1;
  while (lastContentRow > top && isBlackRow(image, lastContentRow)) lastContentRow--;

  return {
    top,
    bottom: height - 1 - lastContentRow,
    cropHeight: lastContentRow - top + 1,
    offsetY: top,
  };
}
