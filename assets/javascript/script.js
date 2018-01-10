$(document).ready(function(){

	var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab",
				  "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

	function renderButtons() {
		$("#buttons").empty();
		for (var i = 0; i < topics.length; i++) {
			var button = $("<input>");
			button.addClass("btn btn-default btn-topic");
			button.attr("type", "button");
			button.attr("value", topics[i]);
			$("#buttons").append(button);
		}
	}

	$("#search-submit").on("click", function(event) {
		event.preventDefault();
		topics.push($("#search-box").val().trim());
		renderButtons();
	});

	renderButtons();

	$(".btn-topic").on("click", function() {
		$.ajax({
			url: `http://api.giphy.com/v1/gifs/search?q=` + $(this).attr("value") + `&api_key=H2IpUL8ZgYrRHlsYaEZOsHTw3WmaPq0I&limit=10`,
			method: "GET"
		}).done(function(response) {

			$("#images").empty();

			for (var j = 0; j < 10; j++) {

				var thumbnail = $("<div>");
				thumbnail.attr("class", "thumbnail");
				thumbnail.attr("style", "float: left")

				var img = $("<img>");
				//img.attr("onclick", imgClick)
				img.attr("src", response.data[j].images.fixed_height_small_still.url);
				img.attr("still", response.data[j].images.fixed_height_small_still.url);
				img.attr("moving", response.data[j].images.fixed_height_small.url);
				thumbnail.append(img);

				var caption = $("<div>");
				caption.attr("class", "caption");
				caption.append("<h4>Rated " + response.data[j].rating.toUpperCase() + "</h4>");
				thumbnail.append(caption);

				$("#images").append(thumbnail);
			}
		});
	});

	$("img").on("click", function() {
		console.log("anything");
		if ($(this).attr("src") === $(this).attr("still")) {

			$(this).attr("src", $(this).attr("moving"));

		} else {
			$(this).attr("src", $(this).attr("still"));
		}
	});
});