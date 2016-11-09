$(function () {

	getSongs();
	//ask the server for songs and then draw them

	$('form').on('submit', function (event) {
		event.preventDefault();
		var formData = $(this).serialize();
		$.ajax({
			type: 'POST',
			url: '/songs',
			data: formData,
			success: getSongs
		});
	});
});

function getSongs() {
	$.ajax({
		type: 'GET',
		url: '/songs',
		success: function (songs) {
			$('#songs').empty();
			songs.forEach(function (song) {
				var day = new Date();
				var today = day.toDateString();
				var $li = $('<li><?li>');
				$li.append('<p>Song: ' + song.title + '</p>');
				$li.append('<p>Band: ' + song.artist + '</p>');
				$li.append(today);
				$('#songs').append($li);
			});
		}
	});
}


// Add the dateAdded to our DOM display for our songs.
