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
        contenedor.append('<p class="contenido">Aún no hay productos nuevos.</p>');
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
  