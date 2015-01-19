(function($) {

	$.fn.optimizeTextBubble = function()  {

		return this.each( function() {

			var props = ['padding-right', 'margin-right', 'padding-left', 'margin-left', 'border-left-width', 'border-right-width'];
			var totok = $(this);
			var text = $(this).text().toString();
			var words = text.split(/\s+/).filter(Boolean);

			var totalMarginPaddingBorder = 0;
			var elemMaxWidth = 0;
			var wordsWidth = 0;
			var wordsTotalWidth = 0;
			var wordsMaxWidth = 0;
			var spaceWidth = 0;
			var emwidth = 0;
			var emspacewidth = 0;

			$.each(props, function(index, value) {
				totalMarginPaddingBorder += parseInt(totok.css(value));
			});

			$(this).css({"width":"100%"});
			elemMaxWidth = $(this).width() - totalMarginPaddingBorder;

			$(this).empty();
			$(this).append("<span>MM</span>");
			emwidth = $(this).children("span").width();
			$(this).empty();
			$(this).append("<span>M M</span>");
			emspacewidth = $(this).children("span").width();
			$(this).empty();
			spaceWidth = emspacewidth - emwidth;

			for (var i=0; i<words.length; i++) {
				$(this).append("<span>" + words[i] + "</span>");
			}
			$(this).children("span").css({"margin-left":(spaceWidth/2)+"px", "margin-right":(spaceWidth/2)+"px"});

			$(this).children("span").each(function() {
				w = $(this).outerWidth(true);
				if (wordsWidth > wordsMaxWidth) {
					wordsMaxWidth = wordsWidth;
				}
				wordsWidth += w;
				wordsTotalWidth += w;
				if (wordsWidth > elemMaxWidth) {
					$("<br>").insertBefore($(this));
					wordsWidth = w;
				} 
				
			});

			if (wordsTotalWidth < elemMaxWidth) {
				$(this).width(wordsTotalWidth);
			} else {
				$(this).width(wordsMaxWidth);
			}

		});

	}

}(jQuery));
