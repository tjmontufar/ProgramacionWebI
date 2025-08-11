$(document).ready(function () {
    $.getJSON("/json/productos.json", function (data) {
        let contenedor = $("#productos-mujeres");
        contenedor.empty();

        let productosMujer = [];

        $.each(data, function (i, categoria) {
            let filtrados = $.grep(categoria.Productos, function (prod) {
                return prod.Genero === "Mujer";
            });
            productosMujer = productosMujer.concat(filtrados);
        });

        if (productosMujer.length > 0) {
            let fila;

            $.each(productosMujer, function (j, prod) {
                if (j % 3 === 0) {
                    fila = $("<div>").addClass("fila-productos");
                }

                let card = $("<div>").addClass("producto-card");
                card.append(
                    `<img src="${prod.Imagen}" class="producto-img">`,
                    `<h3>${prod.Nombre}</h3>`,
                    `<button class="btn-comprar">Ver detalles</button>`
                );
                fila.append(card);

                if (j % 3 === 2 || j === productosMujer.length - 1) {
                    contenedor.append(fila);
                }
            });
        }
    });
});
