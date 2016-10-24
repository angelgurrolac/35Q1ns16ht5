$(document).ready(function() {

(function() {
    var boxes = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.hasAttribute("name")) {
            setupBox();
        }
}//Select id from total checkbox

function setupBox() {
    var storageId = box.getAttribute("name");
    var oldVal    = localStorage.getItem(storageId);
        
    box.checked = oldVal === "true" ? true : false;
        
    box.addEventListener("change", function() {
       localStorage.setItem(storageId, this.checked); 
    });
    
    }//Function setupBox
})//Function

();

});
