alert('sjdfljfd');
(function newGreet() {
  var comments = ["Lets Rock!","I'm down","U up?","I'm ready","Squad Up!"];
  var randomGreet = Math.floor(Math.random() * comments.length);
  document.getElementById('random').innerHTML = comments[randomGreet];
})();

function showNext(open,close) {
  var item = document.getElementById(open);
  var closeitem = document.getElementById(close);
  item.style.display='block';
  closeitem.style.display='none';
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchPlace(confirm) {
	if(confirm) {
  	var close = document.getElementById("nextDescription");
  	var search = document.getElementById("nextSearch");
  	var found = document.getElementById("nextFound");
   	var button = document.getElementById("mainButton");
  	close.style.display='none';
  	search.style.display='block';
  	found.style.display='none';
   	button.style.display='none';
		let waiting = ""
		for (let i = 0; i < 10; i++) {
			let display = "searching";
			display = display.concat(waiting);
  		document.getElementById('replace').innerText = display;
  		// simulate delay
  		await sleep(500);
  		// check if waiting has exceeded amount
  		if (waiting.length > 2) {
  			waiting = ""
  		} else {
  			waiting = waiting.concat(".");
  		}
		}
  	search.style.display='none';
  	found.style.display='block';
   	button.style.display='block';
  	// set random place
  	var picture = [	"https://cdn.discordapp.com/attachments/1257065866902638693/1257074520624205875/sausalito.jpg?ex=66831561&is=6681c3e1&hm=9da43e2e9c9fa377b5f75ad2feb61543481b3aa2febed30477e3764272139430&",
  									"https://cdn.discordapp.com/attachments/1257065866902638693/1257076669957804196/salesforce.jpg?ex=66831761&is=6681c5e1&hm=89dcc2ecbbe04bebfc13dc512b70c001c616f4219df1e99ae36372a9e18b4c5f&",
  									"https://cdn.discordapp.com/attachments/1257065866902638693/1257078246021791764/japantown.jpg?ex=668318d9&is=6681c759&hm=f95a3536e6a5e08d8e91dd2b4e9c1bae9842c85bc9e6cb35abf1cfee8d922312&"];
  	var address = 	["1 Ferry Building",
  									"425 Mission St",
  									"1610 Geary Blvd"];
  	var friends = [	"You are going with David!",
  									"Jacob is who you will see!",
  									"Be prepared to see Stephan!",
  									"Have fun with Yash!",
  									"You are going with Zade!"]
  	var randomplace = Math.floor(Math.random() * address.length);
   	var randomfriend = Math.floor(Math.random() * friends.length);
  	document.getElementById('address').innerHTML = address[randomplace];
  	document.getElementById('whotogo').innerHTML = friends[randomfriend];
  	document.getElementById('mainImage').src = picture[randomplace];
	}
}   

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);