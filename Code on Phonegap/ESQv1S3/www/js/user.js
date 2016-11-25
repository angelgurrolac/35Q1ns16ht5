var form = $('form');
var nameError = $('.nameError');
var passError = $('.passError');

var Data =
[
	{
	name:"user",
	pass:"user"
	},
	{
		name: "admin",
		pass: "1234"
	}
];

form.on('submit', function(e){
e.preventDefault();
	var user=$('.userName');
	var pass=$('.password');
	for (var i = 0; i < Data.length; i++) {
		if (user.val()=== Data[i].name && pass.val()=== Data[i].pass){
			window.location='index.html';
			return;
		} else if (user.val()=== Data[i].name && pass.val()!== Data[i].pass) {
			$(passError).html('');
			return;
		}
	}
	$(nameError).html('incorrect user data');
	return;

}); 	