// Genera los iconos raster del sitio a partir de public/favicon.svg (la unica fuente del logo):
// favicon.ico (48x48), apple-touch-icon.png (180x180, fondo blanco y margen), icon-192.png e icon-512.png.
// Uso: npm run icons. Los resultados se versionan en public/, no se generan en cada build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'public');
const svg = fs.readFileSync(path.join(pub, 'favicon.svg'));
const VIEWBOX = 64; // lado del viewBox del SVG; la densidad se escala para rasterizar nitido a cada tamano

const png = (size) => sharp(svg, { density: (72 * size) / VIEWBOX }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// iOS pinta de negro lo transparente y recorta con esquinas redondeadas: fondo blanco y el escudo al 80 % centrado
async function touchIcon(size) {
    return sharp({ create: { width: size, height: size, channels: 3, background: '#ffffff' } })
        .composite([{ input: await png(Math.round(size * 0.8)) }])
        .png({ compressionLevel: 9 })
        .toBuffer();
}

// .ico con una sola imagen PNG (formato valido desde Windows Vista y en todos los navegadores actuales)
function ico(pngBuffer, size) {
    const header = Buffer.alloc(22);
    header.writeUInt16LE(0, 0); // reservado
    header.writeUInt16LE(1, 2); // tipo: icono
    header.writeUInt16LE(1, 4); // cantidad de imagenes
    header.writeUInt8(size, 6); // ancho
    header.writeUInt8(size, 7); // alto
    header.writeUInt16LE(1, 10); // planos de color
    header.writeUInt16LE(32, 12); // bits por pixel
    header.writeUInt32LE(pngBuffer.length, 14); // tamano de la imagen
    header.writeUInt32LE(header.length, 18); // desplazamiento de la imagen
    return Buffer.concat([header, pngBuffer]);
}

const outputs = {
    'favicon.ico': ico(await png(48), 48),
    'apple-touch-icon.png': await touchIcon(180),
    'icon-192.png': await png(192),
    'icon-512.png': await png(512),
};
for (const [name, data] of Object.entries(outputs)) {
    fs.writeFileSync(path.join(pub, name), data);
    console.log(`icons: ${name} (${data.length} bytes)`);
}
