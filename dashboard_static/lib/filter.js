$(document).ready(function(){
	$(".filterbtn").click(function(){
		$("*.tweet-list li").removeClass("filtered");
		console.log("click");
		name = $("#field1").val();
		loc = $("#field2").val();
		content = $("#field3").val();
		language = $("#field4").val();
		
		pattern1 = new RegExp(name, 'i');
		pattern2 = new RegExp(loc, 'i');
		pattern3 = new RegExp(content, 'i');
		pattern4 = new RegExp(language, 'i');
		
		function nempty(x){
			if (x == "") {
				console.log("false");
				return false;
			}
			else {
				console.log("true");
				return true;
			}
		}
			
		function checkName(x) {
			n = $(x).find(".fullname").text();
			res = n.match(pattern1);
			if ($(res).length){
				return true;
			} else {
				return false;
			}
		}
		
		function checkLoc(x) {
			n = $(x).find(".loc").text();
			res = n.match(pattern2);
			if ($(res).length){
				return true;
			} else {
				return false;
			}
		}
		
		function checkContent(x) {
			n = $(x).find("p").text();
			res = n.match(pattern3);
			if ($(res).length){
				return true;
			} else {
				return false;
			}
		}
		
		function checkLang(x) {
			n = $(x).find(".lang").text();
			res = n.match(pattern4);
			if ($(res).length){
				return true;
			} else {
				return false;
			}
		}
		
		
		$("*.tweet-list li").each(function(){
			current = $(this);
			console.log(current);
			/*
			if(nempty(name) && checkName(current)){
				console.log(nempty(name))
				console.log(checkName())
				//console.log("found Name");
			}
			else if(nempty(loc) && checkLoc(current)){
				console.log("found Location");
			}
			else if(nempty(content) && checkContent(current)){
				console.log("found content");
			}
			else if(nempty(language) && checkLang(current)){
				console.log("found Language");
			}
			else {
				console.log("not found");
				$(this).addClass("filtered");
			}
			*/
			
			if(checkName(current) && checkLoc(current) && checkContent(current) && checkLang(current)) {
				console.log("found");
			} else {
				$(this).addClass("filtered");
				console.log("not found");
			}
		});
	});
});