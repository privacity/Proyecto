const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads/convocatorias");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "convocatoria-" + uniqueSuffix + ext);
    }
});

// Validación del archivo
function fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowed.includes(file.mimetype)) {
        cb(new Error("Formato no válido. Solo JPG o PNG."));
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
