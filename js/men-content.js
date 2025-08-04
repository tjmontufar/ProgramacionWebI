$(document).ready(function () {
    $.getJSON("/json/productos.json", function (data) {
        let contenedor = $("#productos-hombres");
        contenedor.empty();

        $.each(data, function (i, categoria) {
            // Filtrar productos de genero Hombre
            let productosHombre = $.grep(categoria.Productos, function (prod) {
                return prod.Genero === "Hombre";
            });

            if (productosHombre.length > 0) {
                // Crear título de categoría
                // tituloCat es la variable que contiene el título de la categoría
                let tituloCat = $("<h2 style='text-align: center;'>").text(categoria.Categoria).addClass("titulo-categoria");
                contenedor.append(tituloCat);

                // Crear contenedor de tarjetas
                let fila = $("<div>").addClass("fila-productos");

                $.each(productosHombre, function (j, prod) {
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
                });

                contenedor.append(fila);
            }
        });
    });
});