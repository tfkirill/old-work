(function () {
	var page_up_div;
	var page_up_key;
	var page_up_nokey;
	var page_up_div_create = function () {
		page_up_div = $$i({
			create:'div',
			attribute: {},
			insert:$$().body
		}).$$('position','fixed').$$('top',($$s.clientsize().h-50)+'px').$$('left',($$s.scrollpos().l+$$s.clientsize().w-67)+'px').$$('zIndex','5').$$('width','14px').$$('height','7px').$$('backgroundImage','url(updown.png)').$$('backgroundPosition','0 0').$$('backgroundRepeat','no-repeat').$$('cursor','pointer');
	}
	
	var page_up_timer = function () {
		if(page_up_nokey) {
			if($$s.scrollpos().t>=0 && $$s.scrollpos().t<=300) {
				$$(page_up_div).$$('visibility','hidden');
			}
			else if($$s.scrollpos().t>300 && $$s.scrollpos().t<=1000) {
				page_up_key=false;
				$$(page_up_div).$$('visibility','visible').$$('top','50px').$$('left',($$s.scrollpos().l+$$s.clientsize().w-67)+'px').$$('backgroundPosition','0 -7px');
			}
			else if($$s.scrollpos().t>1000) {
				page_up_key=true;
				$$(page_up_div).$$('visibility','visible').$$('top',($$s.clientsize().h-50)+'px').$$('left',($$s.scrollpos().l+$$s.clientsize().w-67)+'px').$$('backgroundPosition','0 0');
			}
		}
	}
	
	var pos_top,z;
	var page_up_to_up_go = function () {
		if(page_up_key) {
			pos_top=pos_top-z;
			z=z+10;
			if(pos_top<0) {
				page_up_nokey=true;
				pos_top=0;
			}
			window.scrollTo(0, pos_top);
			if(pos_top>0) {
				setTimeout(function() { page_up_to_up_go(); },10);
			}
		}
		else {
			pos_top=pos_top+z;
			z=z+10;
			if(pos_top>=($$s.scrollsize().h-$$s.clientsize().h)) {
				page_up_nokey=true;
				pos_top=($$s.scrollsize().h-$$s.clientsize().h);
			}
			window.scrollTo(0, pos_top);
			if(pos_top<($$s.scrollsize().h-$$s.clientsize().h)) {
				setTimeout(function() { page_up_to_up_go(); },10);
			}
		}
	}
	
	var page_up_to_up = function (event) {
		page_up_nokey=false;
		z=10;
		pos_top=$$s.scrollpos().t;
		setTimeout(function() { page_up_to_up_go(); },10);
	}
	
	$$r(function() {
		if(($$s.scrollsize().h-$$s.clientsize().h)>1000) {
			page_up_nokey=true;
			page_up_div_create();
			$$e.add($$(page_up_div),'click',page_up_to_up); 
			page_up_timer();
			setInterval(function() { page_up_timer(); },100);
		}
	});
})();
