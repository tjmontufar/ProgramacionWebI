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
                if (j % 4 === 0) {
                    fila = $("<div>").addClass("fila-productos");
                }

                let card = $("<div>").addClass("producto-card");
                card.append(
                    `<img src="${prod.Imagen}" class="producto-img">`,
                    `<h3>${prod.Nombre}</h3>`,
                    `<p class="descripcion">${prod.Descripcion}</p>`,
                    `<p><strong>Talla:</strong> ${prod.Talla}</p>`,
                    `<p><strong>Precio:</strong> L. ${prod.Precio}</p>`,
                    `<p><strong>Stock:</strong> ${prod.stock}</p>`,
                    `<button class="btn-comprar">Agregar al carrito</button>`
                );
                fila.append(card);

                if (j % 4 === 3 || j === productosMujer.length - 1) {
                    contenedor.append(fila);
                }
            });
        }
    });
});
