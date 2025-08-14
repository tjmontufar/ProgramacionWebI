$(document).ready(function () {
    $.getJSON("/json/productos.json", function (data) {
        let contenedor = $("#productos-new");
        contenedor.empty();

        let nuevos = [];
        $.each(data, function (i, categoria) {
            $.each(categoria.Productos, function (_, prod) {
                if (prod.EsNuevo === true) {
                  nuevos.push(prod);
                }
            });
        });

    if (nuevos.length === 0) {
      contenedor.append(
        '<p class="contenido">Aún no hay productos nuevos.</p>'
      );
      return;
    }
    let fila;
    $.each(nuevos, function (j, prod) {
      if (j % 3 === 0) {
        fila = $("<div>").addClass("fila-productos");
      }

      let card = $("<div>").addClass("producto-card");
      card.append(
        `<img src="${prod.Imagen}" class="producto-img">`,
        `<h3>${prod.Nombre}</h3>`,
        `<p>$. ${prod.Precio}</p>`,
        `<button class="btn-detalles btn-comprar"
             data-id="${prod.id}"
             data-nombre="${prod.Nombre}"
             data-descripcion="${prod.Descripcion}"
             data-precio="${prod.Precio}"
             data-stock="${prod.stock}"
             data-imagen="${prod.Imagen}"
             data-talla="${prod.Talla}">Ver detalles</button>`
      );

      fila.append(card);

      if (j % 3 === 2 || j === nuevos.length - 1) {
        contenedor.append(fila);
      }
    });
  });
});

$(document).ready(function () {
    let productosNuevos = [];
    let filtrosActuales = {
        categoria: null,
        talla: null,
        precio: null
    };

    $.getJSON("/json/productos.json", function (data) {
        $.each(data, function (i, categoria) {
            let filtrados = $.grep(categoria.Productos, function (prod) {
                return prod.EsNuevo === true;
            });
            filtrados.forEach(prod => {
                prod.Categoria = categoria.Categoria;
            });
            
            productosNuevos = productosNuevos.concat(filtrados);
        });

        mostrarProductos(productosNuevos);
        configurarFiltros();
    });

    function mostrarProductos(productos) {
        let contenedor = $("#productos-new");
        contenedor.empty();

        if (productos.length === 0) {
            contenedor.html('<p class="contenido">No se encontraron productos con los filtros seleccionados.</p>');
            return;
        }

        let fila;
        $.each(productos, function (j, prod) {
            if (j % 3 === 0) {
                fila = $("<div>").addClass("fila-productos");
            }

            let card = $("<div>").addClass("producto-card");
            card.append(
                `<img src="${prod.Imagen}" class="producto-img">`,
                `<h3>${prod.Nombre}</h3>`,
                `<p>L. ${prod.Precio}</p>`,
                `<button class="btn-detalles btn-comprar"
                   data-id="${prod.id}"
                   data-nombre="${prod.Nombre}"
                   data-descripcion="${prod.Descripcion}"
                   data-precio="${prod.Precio}"
                   data-stock="${prod.stock}"
                   data-imagen="${prod.Imagen}"
                   data-talla="${prod.Talla}">Ver detalles</button>`
            );
            fila.append(card);

            if (j % 3 === 2 || j === productos.length - 1) {
                contenedor.append(fila);
            }
        });
    }

    function aplicarFiltros() {
        let productosFiltrados = productosNuevos;
        if (filtrosActuales.categoria) {
            productosFiltrados = $.grep(productosFiltrados, function(prod) {
                return prod.Categoria === filtrosActuales.categoria;
            });
        }
        if (filtrosActuales.talla) {
            productosFiltrados = $.grep(productosFiltrados, function(prod) {
                return prod.Talla.includes(filtrosActuales.talla);
            });
        }
        if (filtrosActuales.precio) {
            switch(filtrosActuales.precio) {
                case 'alto':
                    productosFiltrados = $.grep(productosFiltrados, function(prod) {
                        return prod.Precio >= 200;
                    });
                    break;
                case 'medio':
                    productosFiltrados = $.grep(productosFiltrados, function(prod) {
                        return prod.Precio >= 100 && prod.Precio < 200;
                    });
                    break;
                case 'bajo':
                    productosFiltrados = $.grep(productosFiltrados, function(prod) {
                        return prod.Precio < 100;
                    });
                    break;
            }
        }

        mostrarProductos(productosFiltrados);
    }

    function configurarFiltros() {
        $('#pag-new .content-w-20 span.link-style-1').on('click', function() {
            let texto = $(this).text();

            let idPro = {
                'Blusas': 'Blusas',
                'Faldas': 'Faldas',
                'Pantalones': 'Pantalones',
                'Short': 'Short',
                'Tops': 'Tops',
                'Vestidos': 'Vestidos',
                'Zapatos': 'Zapatos',
                'Alto': 'alto',
                'Medio': 'medio',
                'Bajo': 'bajo'
            };

            let id = idPro[texto];

            if (['Blusas', 'Faldas', 'Pantalones', 'Short', 'Tops', 'Vestidos', 'Zapatos'].includes(id)) {

                if (filtrosActuales.categoria === id) {
                    filtrosActuales.categoria = null;
                    $(this).removeClass('active');
                } else {
                    filtrosActuales.categoria = id;
                    $('#pag-new .content-w-20 span.link-style-1').removeClass('active');
                    $(this).addClass('active');
                }
            } else if (['alto', 'medio', 'bajo'].includes(id)) {

                if (filtrosActuales.precio === id) {
                    filtrosActuales.precio = null;
                    $(this).removeClass('active');
                } else {
                    filtrosActuales.precio = id;
                    $('#pag-new .content-w-20 span.link-style-1').removeClass('active');
                    $(this).addClass('active');
                }
            }

            aplicarFiltros();
        });

        $('#pag-new .btn-talla button').on('click', function() {
            let tallaSeleccionada = $(this).text();

            if (filtrosActuales.talla === tallaSeleccionada) {
                filtrosActuales.talla = null;
                $(this).removeClass('active');
            } else {
                filtrosActuales.talla = tallaSeleccionada;
                $('#pag-new .btn-talla button').removeClass('active');
                $(this).addClass('active');
            }

            aplicarFiltros();
        });
    }
});