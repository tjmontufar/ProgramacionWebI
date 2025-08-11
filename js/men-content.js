$(document).ready(function () {
    $.getJSON("/json/productos.json", function (data) {
        let contenedor = $("#productos-hombres");
        contenedor.empty();

        let productosHombre = [];

        $.each(data, function (i, categoria) {
            let filtrados = $.grep(categoria.Productos, function (prod) {
                return prod.Genero === "Hombre";
            });
            productosHombre = productosHombre.concat(filtrados);
        });

        if (productosHombre.length > 0) {
            let fila;

            $.each(productosHombre, function (j, prod) {
                if (j % 3 === 0) {
                    fila = $("<div>").addClass("fila-productos");
                }

                let card = $("<div>").addClass("producto-card");
                card.append(
                    `<img src="${prod.Imagen}" class="producto-img">`,
                    `<h3>${prod.Nombre}</h3>`,
                    `<button class="btn-detalles btn-comprar" data-id="${prod.id}">Ver detalles</button>`
                );
                fila.append(card);

                if (j % 3 === 2 || j === productosHombre.length - 1) {
                    contenedor.append(fila);
                }
            });
        }
    });
});

$(document).on("click", ".btn-detalles", function () {
    $("#pag-detalles-producto").removeClass("active-off").addClass("active-on");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-principal").removeClass("active-on").addClass("active-off");

    let idproducto = $(this).data("id");
    console.log("id: ", idproducto);
});