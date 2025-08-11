var openCart = $("#open-cart");
var closeCart = $("#close-cart");
var cartPanel = $("#cart-panel");
var cartOverlay = $("#cart-overlay");

openCart.on('click', function() {
    cartPanel.addClass("active");
    cartOverlay.addClass("active");
});

closeCart.on('click', function() {
    cartPanel.removeClass("active");
    cartOverlay.removeClass("active");
});