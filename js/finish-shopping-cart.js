let btnFinalizar = $("#finish-shopping-cart");

btnFinalizar.on("click", function() {
    let filasCarrito = $("#tbCarrito tbody tr").length;

    if(filasCarrito > 0) {
        carrito.length = 0;
        stockArray.length = 0;
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
        alert("¡Pedido realizado!");
        $("#txtSubTotal").val("0.00");
        $("#txtImpuesto").val("0.00");
        $("#txtTotal").val("0.00");
        $("#totalProductos").text(0);
    }
    else {
        alert("El carrito de compras está vacío.");
    }
    
});