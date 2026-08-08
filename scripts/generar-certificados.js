const fs = require("fs");
const path = require("path");

// ==========================================
// RUTAS DEL PROYECTO
// ==========================================

const carpetaCertificados = path.join(
    __dirname,
    "..",
    "certificados"
);

const carpetaData = path.join(
    __dirname,
    "..",
    "data"
);

const archivoJSON = path.join(
    carpetaData,
    "certificados.json"
);


// ==========================================
// VERIFICAR CARPETA CERTIFICADOS
// ==========================================

if (!fs.existsSync(carpetaCertificados)) {

    console.error(
        "ERROR: No existe la carpeta certificados/"
    );

    process.exit(1);
}


// ==========================================
// CREAR CARPETA DATA SI NO EXISTE
// ==========================================

if (!fs.existsSync(carpetaData)) {

    fs.mkdirSync(carpetaData, {
        recursive: true
    });

}


// ==========================================
// LEER TODOS LOS PDF
// ==========================================

const archivos = fs
    .readdirSync(carpetaCertificados)
    .filter(archivo =>
        archivo.toLowerCase().endsWith(".pdf")
    );


// ==========================================
// CREAR REGISTRO PARA CADA CERTIFICADO
// ==========================================

const certificados = archivos.map((archivo, index) => {

    const nombre = path
        .basename(archivo, ".pdf")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return {

        id: index + 1,

        nombre: nombre,

        institucion: "Por completar",

        categoria: "Por completar",

        horas: "",

        fecha: "",

        descripcion: "",

        archivo: archivo

    };

});


// ==========================================
// GENERAR ARCHIVO JSON
// ==========================================

fs.writeFileSync(

    archivoJSON,

    JSON.stringify(
        certificados,
        null,
        4
    ),

    "utf8"

);


// ==========================================
// RESULTADO
// ==========================================

console.log("");
console.log("======================================");
console.log(" CERTIFICADOS ACTUALIZADOS");
console.log("======================================");

console.log(
    `PDF encontrados: ${archivos.length}`
);

console.log(
    `JSON generado: ${archivoJSON}`
);

console.log("======================================");
console.log("");