/*! jCheckbox v0.0.1 | MIT License | moh4med.com/projects/jcheckbox */

(function($) {
	var id = 0;
	$.fn.jCheckbox = function(options) {
		id++;

		// Default configurations
		var settings = $.extend({
			rounded: false,
			borderColor: "#d8d8d8",
			background: "#d8d8d8",
			activeBorderColor: "#3498db",
			activeBackground: "#3498db",
		}, options );

		/**
		 * Custom Style
		 */
		if (settings.borderColor !== "#d8d8d8" || settings.background !== "#d8d8d8" || settings.activeBorderColor !== "#3498db" || settings.activeBackground !== "#3498db")
		{
			var $head = $("head").eq(0),
				$style = $head.children("style").eq(0),
				css = "";

			// Out
			css += ".jcheckbox-"+id+" .jchkbox {border-color:"+settings.borderColor+" !important}";
			css += ".jcheckbox-"+id+":hover .jchkbox {border-color:"+settings.borderColor+" !important}";
			css += ".jcheckbox-"+id+":hover .jchkbox span,.jcheckbox-"+id+":hover .jchkbox span {background:"+settings.background+" !important}";
			// Hover
			css += ".jcheckbox-"+id+".active .jchkbox,.jcheckbox-"+id+".active .jchkbox {border-color:"+settings.activeBorderColor+" !important}";
			css += ".jcheckbox-"+id+".active .jchkbox span,.jcheckbox-"+id+".active .jchkbox span {background:"+settings.activeBackground+" !important}";

			if ($style.length < 1) {
				var custom_style = "<style type=\"text/css\">";
					custom_style += css;
					custom_style += "</style>";

				$head.append(custom_style);
			} else {
				$style.append(css);
			}
		}


		return this.each(function() {
			var $this = $(this),
				$input = $this.children("input"),
				type = $input.prop("type"),
				name = $input.attr("name");



			// Add helper classes
			$this.addClass("jcheckbox jcheckbox-done jcheckbox-"+id);
			if (settings.rounded) $this.addClass("jchkbox-rounded");
			if (type == "radio") $this.addClass("radio-"+name);

			// Reset & Update
			$this.children("span.jchkbox").eq(0).remove();
			$input.addClass("jchkbox-unvisible").before("<span class=\"jchkbox\"></span>");
			$this.children("span.jchkbox").append("<span></span>");

			function jCheck(init) {
				if (init) {
					if ($input.prop("checked")) {
		                // if (type == "radio") $body.find(".radio-"+name).removeClass("active");
		                if (type == "radio") $(".radio-"+name).removeClass("active");

		                $this.addClass("active");
		                $input.prop("checked", true).change();
					}
				}
	            else if ( $input.prop("checked") ) {
	                if (type == "radio") return false;

	                $this.removeClass("active");
	                $input.prop("checked", false).change();
	            } else {
	                if (type == "radio") $(".radio-"+name).removeClass("active");

	                $this.addClass("active");
	                $input.prop("checked", true).change();
	            }
			}

			// Init
    		jCheck(true);

			$this.on({
				"click": function(e) {
            		e.preventDefault();
            		jCheck();
				}
			});
		});
	}
	$(".jcheckbox:not(.jcheckbox-done)").jCheckbox();
})(jQuery);