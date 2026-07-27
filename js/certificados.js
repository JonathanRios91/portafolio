// ===============================
// BASE DE DATOS GLOBAL
// ===============================

let certificados = [];


// ===============================
// CONTENEDOR
// ===============================

const contenedor = document.getElementById("lista-certificados");

// ===============================
// CARGAR JSON
// ===============================

async function cargarCertificados() {

    try {

        const respuesta = await fetch("./data/certificados.json");

            certificados = await respuesta.json();

            mostrarCertificados(certificados);

    }

    catch(error){

        console.error("Error cargando certificados:",error);

    }

}

function mostrarCertificados(lista){

    contenedor.innerHTML="";

    lista.forEach(certificado=>{

        contenedor.innerHTML +=`

        <div class="card-certificado">

            <h3>📄 ${certificado.nombre}</h3>

            <p>

                <strong>Institución:</strong> ${certificado.institucion}<br>

                <strong>Categoría:</strong> ${certificado.categoria}<br>

                <strong>Horas:</strong> ${certificado.horas} h<br>

                <strong>Fecha:</strong> ${certificado.fecha}

            </p>

            <p>${certificado.descripcion}</p>

            <div class="botones-certificado">

                <a
                class="btn-certificado"
                href="./certificados/${certificado.archivo}"
                target="_blank">

                Ver PDF

                </a>

                <a
                class="btn-certificado"
                href="./certificados/${certificado.archivo}"
                download>

                Descargar

                </a>

            </div>

        </div>

        `;

    });

}

// ===============================
// BUSCADOR
// ===============================

const buscador = document.getElementById("buscarCertificado");

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase().trim();

    const resultado = certificados.filter(certificado =>

        certificado.nombre.toLowerCase().includes(texto) ||

        certificado.institucion.toLowerCase().includes(texto) ||

        certificado.categoria.toLowerCase().includes(texto) ||

        certificado.descripcion.toLowerCase().includes(texto)

    );

    mostrarCertificados(resultado);

});

cargarCertificados();