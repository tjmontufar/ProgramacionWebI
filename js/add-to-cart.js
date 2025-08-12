var carrito = [];
let btnAgregarCarrito = $("#btnAgregarCarrito");
let tablaCarrito = $("#tbCarrito tbody");

btnAgregarCarrito.on("click", function() {
    let codigo_ = $("#codigoText").text();
    let descripcion_ = $("#productoText").text() + " Talla " + $("#btnTalla .talla-selected").text();
    let cantidad_ = $("#txtCantidad").val();
    let precio_ = (parseFloat($("#precioText").text())).toFixed(2);
    let subtotal_ = cantidad_ * precio_;
    let total_ = parseFloat((subtotal_ * 0.15) + subtotal_);
    total_ = total_.toFixed(2);

    carrito.push({codigo:codigo_, descripcion:descripcion_, cantidad:cantidad_, precio:precio_, subtotal:subtotal_, total:total_});
    let indice = carrito.length-1;

    tablaCarrito.empty();
    carrito.forEach((v, i)=>{
        tablaCarrito.append(
            $("<tr>")
            .attr("data-codigo", v.codigo)
            .append(
                $("<td>").text(v.codigo),
                $("<td>").text(v.descripcion),
                $("<td>").text(v.cantidad),
                $("<td>").text(v.precio),
                $("<td>").text(v.subtotal),
                $("<td>").text(v.total),
                $("<td>").html(`<button onclick="BorrarProducto(`+indice+`)" type="button">&times;</button>`)
            )
        )
    });

    CalcularTotalFactura();
    CalcularTotalProductos(1);
    alert("¡Producto cargado al carrito!");
});

// FUNCION PARA CALCULAR EL SUBTOTAL, ISV Y TOTAL A PAGAR //
function CalcularTotalFactura() {
    let subtotal = 0;
    let isv = 0;
    let total = 0;

    $("#tbCarrito tbody tr").each(function(i,v) {
        let element = $(this).find("td");
        subtotal += parseFloat(element.eq(4).text());
        isv += (subtotal * 0.15);
        total += parseFloat(element.eq(5).text());
    });

    $("#txtSubTotal").val("L."+subtotal.toFixed(2));
    $("#txtImpuesto").val("L."+isv.toFixed(2));
    $("#txtTotal").val("L."+total.toFixed(2));
}

// FUNCION PARA BORRAR UN ELEMENTO DEL CARRITO //
function BorrarProducto(i) {
    let op = confirm("¿Desea quitar este producto del carrito?");
    if(op) {
        carrito.splice(i, 1);
        tablaCarrito.find("tr:eq("+i+")").remove();
        CalcularTotalFactura();
        CalcularTotalProductos(0);
    }
}

function CalcularTotalProductos(action) {
    let totalProductos = parseInt($("#totalProductos").text());
    if (action === 1) {
        totalProductos = totalProductos + 1;
        $("#totalProductos").text(totalProductos);
    }
    else if (action === 0) {
        totalProductos = totalProductos - 1;
        $("#totalProductos").text(totalProductos);
    }
}