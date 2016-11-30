$(document).ready(function() {

if ($(window).width() >= 768 && $(window).width() <= 1024) {
$('#feedback-link').attr('data-toggle', 'modal');
$('#feedback-link').attr('data-target', '#modal-responsive');

//$('#send-feedback').addClass('modal-footer');
$('.paragraph-feedback').find('br').remove();
$('#body-feedback').find('br').remove();
$('.comments').addClass('responsive-m');
$('#header-feedback').addClass('modal-header');
$('#body-feedback').removeClass("container").addClass('modal-body');
$('#send-feedback').removeClass().addClass('modal-footer');

$('#select-link').attr('data-toggle', 'modal');
$('#select-link').attr('data-target', '#modal-responsive');
$('#body-select').addClass('modal-body');
$('#header-select').addClass('modal-header');
$('.select-w').removeClass('container').addClass('container-fluid');

$('#about-link').attr('data-toggle', 'modal');
$('#about-link').attr('data-target', '#modal-responsive');
$('#header-about').addClass('modal-header');
$('#about-body').removeClass('container').addClass('modal-body');

}

$('#modal-responsive').on('hidden.bs.modal', function (e) {
  location.reload();
});



});