$(document).ready(function(){

	target = "";
	operation = "";
	$(".filter").click(function(){
		$("*.tweet-list li").removeClass("filtered");
		target = $(".field1").val();
		operation = $(".field2").val();
		pattern = new RegExp(target, 'i');
		console.log("click");
		switch(operation){
			//Content
			case "1":
				$("*.tweet-list li").each(function(){
					n = $(this).find("p").text();
					res = n.match(pattern);
					console.log(pattern);
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			
			//Hashtag
			case "2":
				$("*.tweet-list li").each(function(){
					n = "#" + $(this).find("p").text();
					res = n.match(pattern);
					console.log(pattern);
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			
			//Author
			case "3":
				$("*.tweet-list li").each(function(){
					n = $(this).find("strong").text();
					res = n.match(pattern);
					console.log(pattern);
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			default:
				console.log("error");
		}
	});
	$("body").on('DOMSubtreeModified',"#tweet",function(){
		//target = $(".field1").val();
		//operation = $(".field2").val();
		pattern = new RegExp(target, 'i');
		switch(operation){
			//Content
			case "1":
				$(".tweet-list li:first").each(function(){
					n = $(this).find("p").text();
					res = n.match(pattern);
					console.log("1");
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			
			//Hashtag
			case "2":
				$(".tweet-list li:first").each(function(){
					n = "#" + $(this).find("p").text();
					res = n.match(pattern);
					console.log("2");
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			
			//Author
			case "3":
				$(".tweet-list li:first").each(function(){
					n = $(this).find("strong").text();
					res = n.match(pattern);
					console.log("3");
					if ($(res).length){
						
					} else {
						$(this).addClass("filtered");
					}
				});
			break;
			default:
				console.log("error");
		}
	});
	});