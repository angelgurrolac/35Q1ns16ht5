$(document).ready(function() {


/**$( ".check").on( 'click', function(){

if( $(this).is(':checked')) {
/*Checkbox selected

var wID = $(this).attr('id');

console.log(wID);

} else {

alert("Ha sido deseleccionado");
}

});*/

(function() {
    var boxes = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.hasAttribute("store")) {
            setupBox(box);
        }
}

    function setupBox(box) {
        var storageId = box.getAttribute("store");
        var oldVal    = localStorage.getItem(storageId);
        console.log(oldVal);
        box.checked = oldVal === "true" ? true : false;

        box.addEventListener("change", function() {
            localStorage.setItem(storageId, this.checked);
        });
    }
})

();

});
