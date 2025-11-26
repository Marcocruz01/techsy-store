import chokidar from "chokidar";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "./img";
const outputFolder = "public/img";

if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

function convertImage(filePath) {
  const fileName = path.basename(filePath); // obtiene solo 'logotipo-techsy.png'
  const inputPath = path.join(inputFolder, fileName);
  const outputPath = path.join(outputFolder, `${path.parse(fileName).name}.webp`);

  sharp(inputPath)
    .webp({ quality: 90 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Imagen convertida: ${fileName}`))
    .catch(err => console.error(`❌ Error al convertir: ${fileName}`, err));
}

// Convertir imágenes iniciales
fs.readdirSync(inputFolder).forEach(file => convertImage(file));

// Escuchar cambios con chokidar
chokidar.watch(inputFolder, { ignoreInitial: true }).on("add", convertImage).on("change", convertImage);
