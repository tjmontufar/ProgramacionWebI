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

                if (j % 4 === 3 || j === productosHombre.length - 1) {
                    contenedor.append(fila);
                }
            });
        }
    });
});
