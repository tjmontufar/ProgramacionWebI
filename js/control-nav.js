$("#p-index").on("click", function () {
    $("#pag-principal").removeClass("active-off").addClass("active-on");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
});

$("#p-hombres").on("click", function () {
    $("#pag-hombres").removeClass("active-off").addClass("active-on");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
    $("#pag-mujeres").removeClass("active-on").addClass("active-off");
});

$("#p-mujeres").on("click", function () {
    $("#pag-mujeres").removeClass("active-off").addClass("active-on");
    $("#pag-hombres").removeClass("active-on").addClass("active-off");
    $("#pag-principal").removeClass("active-on").addClass("active-off");
});