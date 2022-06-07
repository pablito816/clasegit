/**
 * https://jquery.com/
 * https://jqueryvalidation.org/validate/
 * https://getbootstrap.com/docs/3.3/getting-started/
 * https://jqueryui.com/
 */
$(document).ready(function () {
  // en esta sección se escribe el código que debe ejecutar cuando se cargue el DOM

  $("#itemNum2").css("color", "red");

  $(".liClass").css("font-weight", "bold").css("text-transform", "uppercase");

  $(".alert").addClass("alert-info").removeClass("alert-danger");
});
// en esta sección se escribe el código que se dispara con eventos

$(".list-group-item").click(function () {
  console.log($(this).text());
});

var mostrar = true;
$("#showAlert").click(function () {
  mostrar = !mostrar;
  if (mostrar) {
    // mostrar
    $(".alert").fadeIn(2000, function () {
      $("#showAlert").text("Ocultar");
    });
  } else {
    // ocultar
    $(".alert").hide();
    $("#showAlert").text("Mostrar");
  }
});

// botones
$("#inicio").click(function () {
  let value = $("#textOption").val();
  $("#textOption").val("");
  $("ul").prepend(`<li class="list-group-item">${value}</li>`);
});
$("#final").click(function () {
  $("ul").append(`<li class="list-group-item">Final</li>`);
});

$("#antes").click(function () {
  $("ul").before(`<div>Texto antes</div>`);
});
$("#despues").click(function () {
  $("ul").after(`<div>Texto después</div>`);
});

$("#btn-save").click(function () {
  console.log("Guardé los cambios");
  $("#modal-id").modal("hide");
});

/**
 * Guía
 *
 * 1. Obtener el texto de un elemento con la clase "list-group-item" cuando se hace clic sobre él
 *    y mostrarlo en la consola o en un alert.
 *
 * 2. Cambiar de color el texto del elemento con id "itemNum2" al cargar el DOM por primera vez.
 *
 * 3. Poner en negrita y mayúscula el texto de los elementos con la clase "liClass" al cargar el DOM
 *    por primera vez.
 *
 * 4. Adicionar la clase "alert-info" al elemento con la clase "alerta" y eliminar la clase "alert-danger"
 *    cuando se cargue el DOM por primera vez.
 *
 * 5. Convertir el botón en un Toggle para mostrar u ocultar la alerta:
 *    Por defecto la alerta se debe estar mostrando.
 *    Al hacer click sobre el botón debe mostrar u ocultar la alerta.
 *    El texto del botón debe cambiar a "Mostrar" u "Ocultar"
 *
 * 6. Adicionar elementos al inicio o final de la lista al hacer click en los botones "Inicio" o "Final".
 *
 * 7. En el punto anterior tener en cuenta lo que se escribe en la caja de texto y limpiar la caja.
 *
 * 8. Adicionar elementos antes y después de la lista desordenada.
 */
