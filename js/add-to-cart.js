var carrito = [];
var stockArray = [];
let btnAgregarCarrito = $("#btnAgregarCarrito");
let tablaCarrito = $("#tbCarrito");

btnAgregarCarrito.on("click", function() {
    let codigo_ = $("#codigoText").text();
    let descripcion_ = $("#productoText").text() + " Talla " + $("#btnTalla .talla-selected").text();
    let cantidad_ = parseInt($("#txtCantidad").val());
    let precio_ = (parseFloat($("#precioText").text())).toFixed(2);
    let subtotal_ = cantidad_ * precio_;
    let total_ = parseFloat((subtotal_ * 0.15) + subtotal_);
    let imagen_ = $("#imagenProducto").attr("src");
    total_ = total_.toFixed(2);

    carrito.push({codigo:codigo_, imagen:imagen_, descripcion:descripcion_, cantidad:cantidad_, precio:precio_, subtotal:subtotal_, total:total_});

    tablaCarrito.empty();
    let thead = `<thead>
                    <tr>
                        <th width="10%">Codigo</th>
                        <th width="10%"></th>
                        <th>Descripcion</th>
                        <th width="10%">Cantidad</th>
                        <th width="10%">Precio</th>
                        <th width="10%">Subtotal</th>
                        <th width="10%">Total</th>
                        <th width="10%"></th>
                    </tr>
                </thead>`;
    tablaCarrito.append(thead);
    tablaCarrito.append("<tbody>");
    carrito.forEach((v, i)=>{
        tablaCarrito.append(
            $("<tr>")
            .attr("data-codigo", v.codigo)
            .append(
                $("<td>").text(v.codigo),
                $("<td>").html(`<img class="cart-img-product" src="`+v.imagen+`">`),
                $("<td>").text(v.descripcion),
                $("<td>").text(v.cantidad),
                $("<td>").text(v.precio),
                $("<td>").text(v.subtotal),
                $("<td>").text(v.total),
                $("<td>").html(`<button onclick="BorrarProducto(`+i+`)" type="button">&times;</button>`)
            )
        )
    });
    tablaCarrito.append("</tbody>");

    let stockActual = parseInt($("#stockText").text());
    ControlDeStock(stockActual, codigo_, cantidad_, "agregar");

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
        subtotal += parseFloat(element.eq(5).text());
        isv += (subtotal * 0.15);
        total += parseFloat(element.eq(6).text());
    });

    $("#txtSubTotal").val("L."+subtotal.toFixed(2));
    $("#txtImpuesto").val("L."+isv.toFixed(2));
    $("#txtTotal").val("L."+total.toFixed(2));
}

// FUNCION PARA BORRAR UN ELEMENTO DEL CARRITO //
function BorrarProducto(i) {
    let op = confirm("¿Desea quitar este producto del carrito?");
    if(op) {
        let stockActual = parseInt($("#stockText").text());
        let fila = tablaCarrito.find("tbody tr").eq(i);
        let cantDevolver = parseInt(fila.find("td").eq(3).text());
        let codigoProducto = fila.attr("data-codigo");
        ControlDeStock(stockActual,codigoProducto,cantDevolver,"devolver");

        carrito.splice(i, 1);
        tablaCarrito.find("tbody tr:eq("+i+")").remove();
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

// FUNCION PARA LLEVAR CONTROL DEL STOCK ACTUAL ENTRE DIFERENTES PRODUCTOS //
function ControlDeStock(stock, codigo, cantidad, accion) {
    let productoStock = stockArray.find(item => item.codigoProducto === codigo);

    if(productoStock) {
        if(accion === "agregar") {
            productoStock.stockRestante -= cantidad;
            productoStock.stockCarrito += cantidad;
        } else if (accion === "devolver") {
            productoStock.stockRestante += cantidad;
            productoStock.stockCarrito -= cantidad;
        }

    } else {
        if(accion === "agregar") {
            let stockNuevo = stock - cantidad;
            stockArray.push({codigoProducto:codigo, stockRestante:stockNuevo, stockCarrito:cantidad});
        }   
    }

    let stockActualEnPantalla = stockArray.find(item => item.codigoProducto === codigo).stockRestante;
    $("#stockText").text(stockActualEnPantalla);
    
    console.log(stockArray);
}