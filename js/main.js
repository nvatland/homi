$(document).ready(function(){
	$('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
	$('#login').show();
	$('#signup, #timeline, #question-1, #profile, nav, #newquestionbox, #search, #chat, #indivmessage, #messages').hide();
	$('a, .nav-links a, #kenneth, #chat-btn, .newmessage, .btn-click').click(function(){
		console.log($(this).data('location'));
		var location = $(this).data('location');
		$('#signup, #timeline, #question-1, #profile, nav, #login, #search, #chat, #indivmessage, #messages').hide();
		if (location == 'timeline' || 'question-1' || 'profile' || 'search') {
			$('.nav-links a').removeClass('active');
			$('#nav-' + location).addClass('active');
			$('nav').show();
			$('#' + location).show();
			switch(location) {
				case 'timeline':
					$('#nav_title').html('Timeline');
					break;
				case 'question-1':
					$('#nav_title').html('Question');
					break;
				case 'profile':
					$('#nav_title').html('Profile');
					break;
				case 'search':
					$('#nav_title').html('Search');
					break;
				case 'messages':
					$('#nav_title').html('Messages');
					break;
			}
		} 
		if (location == 'signup' || location == 'login') {
			$('nav').hide();
			$('#' + location).show();
		}
	});

	$('#nav-menu-btn').click(function(event) {
		$('.overlay').removeClass('hidden');
		$('.overlay').animate({opacity: 1}, 'fast', function() {
			$('.navigation').css('left', '-60%');
			$('.navigation').removeClass('hidden').animate({left: 0}, 400);
			$('#close').animate({left:'54%'}, 400);
		});
	});

	$('#close, .nav-links a').click(function(event) {
		$('.navigation').animate({left: '-60%'}, 400);
		$('#close').animate({left:'-54%'}, 400, function(){
			$('.overlay').animate({opacity: 0}, 'fast');
			$('.overlay, .navigation').addClass('hidden');
		});
	});

	$('#newquestion').click(function(event) {
		$('.overlay').removeClass('hidden');
		$('.overlay').animate({opacity: 1}, 'fast', function() {
			$('#newquestionbox').show('fast');
		});
	});

	$('#newquestionbox .btn, #newquestionbox .close').click(function(event) {
		$('#newquestionbox').hide('fast', function(){
			$('.overlay').animate({opacity: 0}, 500).addClass('hidden');
		});
	});

	$('#sendmessage').click(function(event) {
		var message = $('#messagearea').val();
		$('#indivmessage .messagescontain').append('<div class="sent">' + message + '</div>');
		$('#messagearea').val('');
	});

	$('#reply').click(function(event) {
		var reply = $('#replytext').val();
		$('#question-1 .responses').append('<div class="flex question qlarge reply"><div class="question-user-picture qlarge"><img src="images/user/1.jpg" alt=""></div><div class="question-data flex flex-col"><h3 class="question-data__name">Kenneth Gonzalez</h3><p>' + reply +' </p><div class="question-data-count flex"><div class="likes flex"><img src="images/like.svg" class="svg" alt=""><p>1</p></div><div class="replies flex"><img src="images/reply.svg" class="svg" alt=""><p>0</p></div></div></div></div>');
		$('#replytext').val('');
	});

	$('#ask').click(function(event) {
		/* Act on the event */
		var question = $('#questioninput').val();
		var more = $('#questiontextbox').val()
		$('#timeline .timeline-contain').append('<a href="#" data-location="question-1" class="question-contain flex flex-col qlarge"><div class="flex question qlarge"><div class="question-user-picture"><img src="images/user/1.jpg" alt=""></div><div class="question-data flex flex-col"><h3 class="question-data__name">Kenneth Gonzalez</h3><h2 class="question-data__question">' + question + '</h2><p>' + more.substr(0,113) + '</p><div class="question-data-count flex"><div class="likes flex"><img src="images/like.svg" class="svg" alt=""><p>' + Math.round(Math.random())*10 + '</p></div><div class="replies flex"><img src="images/reply.svg" class="svg" alt=""><p>' + Math.round(Math.random())*5 +'</p></div></div></div></div></a>');
		$('#questioninput, #questiontextbox').val('');
	});
});