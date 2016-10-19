$(document).ready(function() {

	$( ".check").on( 'click', function(){
		
	    if( $(this).is(':checked')) {
	        /*Checkbox selected*/
	        var wID = $(this).attr('id');
	      

	     

	        console.log(wID);
	     } 

	    else {
	        alert("Ha sido deseleccionado");
	    }
});

//Drag/Drop
    $(".widgets").shapeshift();

});