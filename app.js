// Variables globales para los elementos de los textareas en el HTML
const campoTexto = document.querySelector("#texto-encriptado");
const campoMensaje = document.querySelector("#campo-mensaje");
const btnModoOscuro = document.querySelector("#toggle-dark-mode");

// Matriz con códigos incluyendo ñ
const matrizCode = [];

// Función para obtener el valor numérico asociado a una letra
function getValor(letra) {
  if (letra === "ñ") {
    return 28; // Valor especial para la letra "ñ"
  }
  // El valor numérico es la posición de la letra en el abecedario, comenzando desde 27 para 'a'
  return 27 - (letra.charCodeAt(0) - "a".charCodeAt(0));
}

// Generar la matriz con todas las letras del abecedario y sus valores numéricos asociados
function generarMatrizCode() {
  matrizCode.length = 0; // Limpiar la matriz antes de generarla nuevamente
  for (let letra of "abcdefghijklmnopqrstuvwxyzñ") {
    matrizCode.push([letra, getValor(letra)]);
  }
}

// Función para encriptar el texto del campo de entrada
function encriptar(fraseSinEncriptar) {
  generarMatrizCode(); // Generar la matriz de código antes de encriptar
  // Reemplazar "pr" por un valor único temporal
  fraseSinEncriptar = fraseSinEncriptar.replaceAll("pr", "Ѡ");
  for (let i = 0; i < matrizCode.length; i++) {
    if (fraseSinEncriptar.includes(matrizCode[i][0])) {
      fraseSinEncriptar = fraseSinEncriptar.replaceAll(
        matrizCode[i][0],
        matrizCode[i][1]
      );
    }
  }
  // Restaurar "pr" a su forma original
  fraseSinEncriptar = fraseSinEncriptar.replaceAll("Ѡ", "pr");
  return fraseSinEncriptar;
}

// Función para desencriptar el texto del campo de entrada
function desencriptar(fraseEncriptada) {
  generarMatrizCode(); // Generar la matriz de código antes de desencriptar
  for (let i = 0; i < matrizCode.length; i++) {
    // Reemplazar el valor especial de "ñ" con la letra "ñ"
    fraseEncriptada = fraseEncriptada.replaceAll("28", "ñ");
    // Desencriptar el resto del texto
    fraseEncriptada = fraseEncriptada.replaceAll(
      String(matrizCode[i][1]),
      matrizCode[i][0]
    );
  }
  return fraseEncriptada;
}

// Función para copiar el contenido de un textarea al portapapeles
async function copyToClipboard(textArea) {
  try {
    await navigator.clipboard.writeText(textArea.value);
    console.log("Texto copiado al portapapeles");
  } catch (err) {
    console.error("No se pudo copiar el texto: ", err);
  }
}

// Botones de copiar asociados a los textareas
const btnCopiarTextoEncriptado = document.getElementById("btn-copiar-1");
const btnCopiarCampoMensaje = document.getElementById("btn-copiar-2");

// EventListeners para los botones de copiar
btnCopiarTextoEncriptado.addEventListener("click", () => {
  copyToClipboard(campoTexto);
});

btnCopiarCampoMensaje.addEventListener("click", () => {
  copyToClipboard(campoMensaje);
});

// Función para encriptar el texto del campo de entrada
function btnEncriptar() {
  const texto = encriptar(campoTexto.value.toLowerCase());
  campoMensaje.value = texto;
  campoTexto.value = "";
}

// Función para desencriptar el texto del campo de entrada
function btnDesencriptar() {
  const mensajeEncriptado = desencriptar(campoMensaje.value);
  campoTexto.value = mensajeEncriptado;
  campoMensaje.value = "";
}

// Función para activar el modo oscuro
function activarModoOscuro() {
  document.body.classList.add("dark-mode"); // Agregar clase 'dark-mode' al body
}

// Función para desactivar el modo oscuro
function desactivarModoOscuro() {
  document.body.classList.remove("dark-mode"); // Remover clase 'dark-mode' del body
}

// Toggle entre modos claro y oscuro
function alternarModo() {
  if (document.body.classList.contains("dark-mode")) {
    desactivarModoOscuro();
  } else {
    activarModoOscuro();
  }
}

// EventListener para el botón de alternar modo
btnModoOscuro.addEventListener("click", alternarModo);

// Inicialización
generarMatrizCode();
