var carrito = [];
var stockArray = [];
let btnAgregarCarrito = $("#btnAgregarCarrito");
let tablaCarrito = $("#tbCarrito");

btnAgregarCarrito.on("click", function() {
    let codigo_ = $("#codigoText").text();
    let talla_ = $("#btnTalla .talla-selected").text();
    let descripcion_ = $("#productoText").text() + " Talla " + talla_;
    let cantidad_ = parseInt($("#txtCantidad").val());
    let precio_ = (parseFloat($("#precioText").text())).toFixed(2);
    let subtotal_ = cantidad_ * precio_;
    let total_ = parseFloat((subtotal_ * 0.15) + subtotal_);
    let imagen_ = $("#imagenProducto").attr("src");
    total_ = total_.toFixed(2);
    
    let stockActualTxt = ($("#stockText").text() || "").toString().trim();
    let stockActual = parseInt(stockActualTxt);
    if (isNaN(stockActual)) stockActual = 0;

    let codigoProductoId = talla_ + codigo_;

    // NUEVO--si es cwro
    if (stockActual <= 0) {
        alert("Producto agotaddo.");
        $("#txtCantidad").val(0).attr("max", 0);
        return 0;
    }

    // NUEVO
    if (cantidad_ > stockActual) {
        alert("Sólo hay " + stockActual + " en stock para esa talla. Se ajustará la cantidad.");
        cantidad_ = stockActual;
        subtotal_ = cantidad_ * parseFloat(precio_);
        total_ = (subtotal_ * 0.15) + subtotal_;
    }

    let exists = tablaCarrito.find(`tr[data-codigo="`+codigoProductoId+`"]`);

    if(exists.length > 0) {
        let agregarProducto = confirm("El producto seleccionado ya se encuentra en el carrito, ¿desea agregar ("+cantidad_+") al carrito?");

        if(agregarProducto) {
            let itemCarrito = carrito.find(item => item.codigo === codigoProductoId);
            if (itemCarrito) {
                // NUEVO
                let aAgregar = Math.min(cantidad_, stockActual);
                if (aAgregar <= 0) {
                    alert("No hay stock adicional disponible.");
                    return 0;
                }

                itemCarrito.cantidad += cantidad_;
                itemCarrito.subtotal = itemCarrito.cantidad * parseFloat(itemCarrito.precio);
                itemCarrito.total = (itemCarrito.subtotal * 0.15) + itemCarrito.subtotal;
            }

            let fila = tablaCarrito.find(`tr[data-codigo="`+codigoProductoId+`"]`);
            fila.find("td").eq(3).text(itemCarrito.cantidad);
            fila.find("td").eq(5).text(itemCarrito.subtotal.toFixed(2));
            fila.find("td").eq(6).text(itemCarrito.total.toFixed(2));

            ControlDeStock(stockActual, codigo_, codigoProductoId, cantidad_, "agregar");
            CalcularTotalFactura();
            CalcularTotalProductos();
        }

        return 0;
    }

    carrito.push({codigo:codigoProductoId, imagen:imagen_, descripcion:descripcion_, cantidad:cantidad_, precio:precio_, subtotal:subtotal_, total:total_});

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
                $("<td>").html(`<button onclick="BorrarProducto('${v.codigo}')" type="button">&times;</button>`)
            )   // NUEVO (Se cambia la variable a cargar en BorrarProducto)
        )
    });
    tablaCarrito.append("</tbody>");

    ControlDeStock(stockActual, codigo_, codigoProductoId, cantidad_, "agregar");
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
// NUEVO: FUNCION ACTUALIZADA A NO DEPENDER DEL INDICE
function BorrarProducto(codigoProducto_) {
    let op = confirm("¿Desea quitar este producto del carrito?");
    if(op) {
        let fila = tablaCarrito.find(`tbody tr[data-codigo="${codigoProducto_}"]`);

        if(fila.length) {
            let stockActual = parseInt($("#stockText").text());
            let cantDevolver = parseInt(fila.find("td").eq(3).text());
            let itemStock = stockArray.find(item => item.codigoProducto === codigoProducto_);
            let idProducto_ = itemStock.idProducto;
            ControlDeStock(stockActual,idProducto_,codigoProducto_,cantDevolver,"devolver");
            carrito = carrito.filter(item => item.codigo !== codigoProducto_);
            fila.remove();
            CalcularTotalFactura();
            CalcularTotalProductos(0);
        }
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
function ControlDeStock(stock, id, codigo, cantidad, accion) {
    let productoStock = stockArray.find(item => item.codigoProducto === codigo);

    if(productoStock) {
        if(accion === "agregar") {
            if (cantidad > productoStock.stockRestante) cantidad = productoStock.stockRestante;
            productoStock.stockRestante -= cantidad;
            productoStock.stockCarrito += cantidad;
        } else if (accion === "devolver") {
            productoStock.stockRestante += cantidad;
            productoStock.stockCarrito -= cantidad;
        }

    } else {
        if(accion === "agregar") {
            let stockNuevo = stock - cantidad;
            if (stockNuevo < 0) stockNuevo = 0;
            stockArray.push({idProducto:id,codigoProducto:codigo, stockRestante:stockNuevo, stockCarrito:cantidad});
        }   
    }

    // NUEVO 
    let stockActualEnPantalla = stockArray.find(item => item.codigoProducto === codigo).stockRestante;

    if (stockActualEnPantalla <= 0) {
        txtStock.text(0);
        $("#txtOutStock").removeAttr("hidden"); ///Esto es para mostrar lo que puso Tomy de AGOTADO
        txtCantidad.val(0);
        txtCantidad.attr("max", 0);
    } else {
        $("#stockText").text(stockActualEnPantalla);
        $("#txtOutStock").attr("hidden", true);
        let val = parseInt($("#txtCantidad").val(),10) || 1;
        if (val > stockActualEnPantalla) $("#txtCantidad").val(stockActualEnPantalla);
        $("#txtCantidad").attr("max", stockActualEnPantalla);
    }
    
    console.log(stockArray);
}