/**
 * https://jquery.com/
 * https://jqueryvalidation.org/validate/
 * https://getbootstrap.com/docs/3.3/getting-started/
 * https://jqueryui.com/
 */

var table;

$(document).ready(async () => {
  // en esta sección se escribe el código que debe ejecutar cuando se cargue el DOM
  cargarDepartamentos();

  // para tablas que se renderizan en html al cargar la página
  $(".test-table").DataTable();

  // para cargar con ajax
  // en columns se debe indicar las columnas a utlizar
  // table = $(".test-table").DataTable({
  //   ajax: "https://avanti-server.herokuapp.com/",
  //   columns: [{ data: "nombre" }, { data: "email" }],
  // });

  // table.on("xhr", function () {
  //   var json = table.ajax.json();
  //   // alert(json.data.length + " row(s) were loaded");
  // });

  // atributos name
  $("#my-form").validate({
    rules: {
      email: {
        required: true,
        minlength: 15,
      },
      edad: {
        mayorEdad: true,
      },
    },
    messages: {
      email: {
        required: "Este campo es requerido",
        minlength: jQuery.validator.format("Debe tener mínimo {0} caracteres"),
      },
    },
  });

  jQuery.validator.addMethod(
    "mayorEdad",
    function (value, element) {
      // allow any non-whitespace characters as the host part
      return value >= 18;
    },
    "Debe ser mayor de edad"
  );
});

// en esta sección se escribe el código que se dispara con eventos

/******************************************
 * Servicios disponibles
 ******************************************
 * Enviar datos por método GET
 * GET https://avanti-server.herokuapp.com/form
 *
 * Enviar datos por método POST
 * POST https://avanti-server.herokuapp.com/form
 *
 * Obtener departamentos
 * GET https://avanti-server.herokuapp.com/regions
 *
 * Obtener ciudades
 * GET https://avanti-server.herokuapp.com/cities?region_id=NUMBER
 */

/**
 * Guía
 *
 * 1. Obtener los departamentos y ponerlos en el select de departamentos.
 *
 * 2. Adicionar el elemento "Seleccionar" por defecto y sin valor.
 *
 * 3. Al cambiar de departamento, debe consultar las ciudades correspondientes.
 *
 * 4. Al enviar los datos, prevenir que el formulario redireccione.
 *
 * 5. Asignar el método o tipo de petición que hace el formulario. (preventDefault)
 *
 * 6. Al presionar el botón GET, se deben enviar los datos al servidor con este método.
 *
 * 7. Al presionar el botón POST, se deben enviar los datos al servidor con este método.
 *
 * 8. Hacer funcionar el contador con los eventos de incrementar y decrementar.
 *
 * 9. Clonar el contador original y generar nuevos contadores independientes.
 *
 * 10. Gráficos
 *
 * 11. Tablas - dataTable
 *
 * 12. Validación de datos
 */

var counter = 0;

// $(".increment").click(function () {
//   counter = parseInt($(".counter-value").text());
//   $(".counter-value").text(++counter);
// });

/*
<div class="row counter-container to-clone">
  <button class="btn btn-default increment">+ Incrementar</button>
  <span class="btn btn-default counter-value">0</span>
  <button class="btn btn-default decrement">- Decrementar</button>
</div>
*/

// $(".increment").click(function () {
$(document).on("click", ".increment", function () {
  let counterValueElement = $(this).parents(".counter-container").find(".counter-value");

  counter = parseInt(counterValueElement.text());
  counterValueElement.text(++counter);
});

$(document).on("click", ".decrement", function () {
  let counterValueElement = $(this).parents(".counter-container").find(".counter-value");

  counter = parseInt(counterValueElement.text());
  counterValueElement.text(--counter);
});

// $(".decrement").click(function () {
//   counter = parseInt($(".counter-value").text());
//   $(".counter-value").text(--counter);
// });

$("#btn-clone").click(function () {
  let html = '<div class="row counter-container">' + $(".to-clone").html() + "</div>";
  $(".to-clone").after(html);
});

/**
 *
 */
$(".btn-submit").click(function () {
  $("#my-form").attr("method", $(this).val());
});

$("#my-form").submit(function (e) {
  e.preventDefault();
  let method = $("#my-form").attr("method");

  let data = $("#my-form").serializeArray();

  $.ajax({
    type: method,
    url: "https://avanti-server.herokuapp.com/form",
    data,
    success: function (result) {
      console.log(result);
    },
    // dataType: dataType
  });
});

function cargarDepartamentos() {
  let URL = `https://avanti-server.herokuapp.com/regions`;

  $.get(URL, function (data) {
    // console.log(data);
    if (data.ok) {
      let departamentos = data.result;
      let opciones = departamentos.map((row) => {
        return `<option value="${row.id}">${row.name}</option>`;
      });
      // console.log(opciones);
      opciones.unshift(`<option value="">Seleccionar</option>`);
      $("#region").html(opciones.join(""));
      // $("#region").prepend(`<option value="">Seleccionar prepend</option>`);
    } else {
      console.log("Error al cargar los departamentos");
    }
  });
}

$("#region").change(function () {
  let URL = `https://avanti-server.herokuapp.com/cities`;

  let params = {
    region_id: $("#region").val(),
  };
  // console.log(params);

  $.get(URL, params, function (data) {
    // console.log(data);
    if (data.ok) {
      let departamentos = data.result;
      let opciones = departamentos.map((row) => {
        return `<option value="${row.id}">${row.name}</option>`;
      });
      // console.log(opciones);
      opciones.unshift(`<option value="">Seleccionar</option>`);
      $("#ciudad").html(opciones.join(""));
      // $("#region").prepend(`<option value="">Seleccionar prepend</option>`);
    } else {
      console.log("Error al cargar los departamentos");
    }
  });
});
