let txtStock = $("#stockText");
let txtCantidad = $("#txtCantidad");

$(document).on("click", ".btn-detalles", function () {
    $("#pag-detalles-producto").removeClass("active-off").addClass("active-on");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-new").removeClass("active-on").addClass("active-off");

    let idproducto = $(this).data("id");
    let nombre = $(this).data("nombre");
    let descripcion = $(this).data("descripcion");
    let precio = $(this).data("precio");
    let imagen = $(this).data("imagen");
    let stock = $(this).data("stock");
    let talla = $(this).data("talla");

    // Cargar los datos del producto seleccionado a la seccion Detalles
    let txtNombreProducto = $("#productoText");
    let txtDescripcionProducto = $("#descripcionText");
    let txtPrecio = $("#precioText");
    let txtImagen = $("#ImagenPanel");
    let txtCodigo = $("#codigoText");

    txtNombreProducto.text(nombre);
    txtDescripcionProducto.text(descripcion);
    txtPrecio.text(precio);
    txtImagen.html(`<img id="imagenProducto" class="img-details margin-10" src="`+imagen+`" alt="ImagenPanel">`);
    txtStock.text(stock);
    txtCantidad.val(1);
    txtCantidad.attr("max",stock);
    txtCodigo.text(idproducto);

    let tallasArray = talla.split("-");
    mostrarTallasDisponibles(tallasArray);
});

// BOTONES PARA SUMAR O RESTAR LA CANTIDAD DE PRODUCTOS A LLEVAR // 
let btnMas = $("#btnMas");
let btnMenos = $("#btnMenos");

btnMas.on("click", function() {
    cantidadActual = parseInt(txtCantidad.val(), 10);
    let maxStock = parseInt(txtCantidad.attr("max"), 10);

    if(cantidadActual < maxStock) {
        txtCantidad.val(cantidadActual + 1);
    }
});

btnMenos.on("click", function() {
    cantidadActual = parseInt(txtCantidad.val(), 10);

    if(cantidadActual > 1) {
        txtCantidad.val(cantidadActual - 1);
    }
});

// FUNCION PARA CARGAR LOS BOTONES QUE PERMITA ELEGIR LA TALLA DISPONIBLE POR PRODUCTO SELECCIONADO //
function mostrarTallasDisponibles(tallas) {
    let btnTalla = $("#btnTalla");
    btnTalla.empty();

    tallas.forEach((talla, i) => {
        let btn = $("<button>")
                .text(talla)
                .attr("type", "button")
                .on("click", function() {
                    $("#btnTalla button").removeClass("talla-selected");
                    $(this).addClass("talla-selected");
                });
        if(i === 0) {
            btn.addClass("talla-selected");
        }
        btnTalla.append(btn);
    });
}
