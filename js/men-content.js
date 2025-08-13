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

                if (j % 3 === 2 || j === productosHombre.length - 1) {
                    contenedor.append(fila);
                }
            });
        }
    });
});

$(document).ready(function () {
    let productosHombre = [];
    let filtrosActuales = {
        categoria: null,
        talla: null,
        precio: null
    };

    $.getJSON("/json/productos.json", function (data) {
        $.each(data, function (i, categoria) {
            let filtrados = $.grep(categoria.Productos, function (prod) {
                return prod.Genero === "Hombre";
            });
            filtrados.forEach(prod => {
                prod.Categoria = categoria.Categoria;
            });
            productosHombre = productosHombre.concat(filtrados);
        });

        mostrarProductos(productosHombre);
        configurarFiltros();
    });
    
    function mostrarProductos(productos) {
        let contenedor = $("#productos-hombres");
        contenedor.empty();

        if (productos.length === 0) {
            contenedor.html('<p>No se encontraron productos con los filtros seleccionados.</p>');
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
        let productosFiltrados = productosHombre;
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
        $('#pag-hombres .content-w-20 a[id]').on('click', function(e) {
            e.preventDefault();
            let id = $(this).attr('id');
            // Agregar la categoria 'Nuevo'
            if (['Nuevo', 'Camisas', 'Camisetas', 'pantalones', 'Calsonetas', 'zapatos'].includes(id)) {
                if (filtrosActuales.categoria === id) {
                    filtrosActuales.categoria = null;
                    $(this).removeClass('active');
                } else {
                    filtrosActuales.categoria = id;
                    $('#pag-hombres .content-w-20 a[id]').removeClass('active');
                    $(this).addClass('active');
                }
            } else if (['alto', 'medio', 'bajo'].includes(id)) {
                if (filtrosActuales.precio === id) {
                    filtrosActuales.precio = null;
                    $(this).removeClass('active');
                } else {
                    filtrosActuales.precio = id;
                    $('#pag-hombres .content-w-20 a[id="alto"], #pag-hombres .content-w-20 a[id="medio"], #pag-hombres .content-w-20 a[id="bajo"]').removeClass('active');
                    $(this).addClass('active');
                }
            }

            aplicarFiltros();
        });
        $('#pag-hombres .btn-talla button').on('click', function() {
            let tallaSeleccionada = $(this).text();

            if (filtrosActuales.talla === tallaSeleccionada) {
                filtrosActuales.talla = null;
                $(this).removeClass('active');
            } else {
                filtrosActuales.talla = tallaSeleccionada;
                $('#pag-hombres .btn-talla button').removeClass('active');
                $(this).addClass('active');
            }

            aplicarFiltros();
        });
    }
});

