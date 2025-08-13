$("#p-index").on("click", function () {
    $("#pag-principal").removeClass("active-off").addClass("active-on");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas, #pag-metodos , #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-hombres, #img-p-hombres, #btn-camisas-hombre").on("click", function () {
    $("#pag-hombres").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas, #pag-metodos , #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-mujeres, #img-p-mujeres, #btn-vestidos-mujer, #btn-zapatos-mujer").on("click", function () {
    $("#pag-mujeres").removeClass("active-off").addClass("active-on");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas, #pag-metodos , #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-historia").on("click", function () {
    $("#pag-historia").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres , #pag-comprar, #pag-preguntas , #pag-politicas, #pag-metodos, #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-comprar").on("click", function () {
    $("#pag-comprar").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-preguntas, #pag-politicas, #pag-metodos , #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-preguntas").on("click", function () {
    $("#pag-preguntas").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-politicas, #pag-metodos , #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-politicas").on("click", function () {
    $("#pag-politicas").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-metodos, #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-metodos , .nav-metodos").on("click", function () {
    $("#pag-metodos").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas, #pag-envios, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-envios , .nav-envios").on("click", function () {
    $("#pag-envios").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas , #pag-metodos, #pag-atencion, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#p-atencion").on("click", function () {
    $("#pag-atencion").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas , #pag-metodos, #pag-envios, #pag-detalles-producto, #pag-new").removeClass("active-on").addClass("active-off");
});

$("#btn-camisas-hombre").on("click", function() {
    window.scrollTo(0, 0);
});

$("#btn-vestidos-mujer").on("click", function() {
    window.scrollTo(0, 0);
});

$("#btn-zapatos-mujer").on("click", function() {
    window.scrollTo(0, 0);
});

$("#p-new , .nav-nuevos, #img-p-newarrivals").on("click", function () {
  $("#pag-new").removeClass("active-off").addClass("active-on");
  $("#pag-principal").removeClass("active-on").addClass("active-off");
  $("#pag-hombres , #pag-mujeres").removeClass("active-on").addClass("active-off");
  $("#pag-historia, #pag-comprar , #pag-preguntas, #pag-politicas , #pag-metodos, #pag-envios, #pag-detalles-producto, #pag-atencion").removeClass("active-on").addClass("active-off");
});