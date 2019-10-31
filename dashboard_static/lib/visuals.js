var dmode = false;

$(document).ready(function(){
	var audio = {};
	audio["noti"] = new Audio();
	audio["noti"].src = "notification.mp3"
    
	$("#visuals > div").addClass("invisible");
    $(".Graph").removeClass("invisible");
    $(".Graph div").removeClass("invisible");
	$("#wolk").css("display","none");
    $("#graph").addClass("grid_8 vert_8");

    $("#btn_cloud").click(function(){ 
        $("#visuals > div").addClass("invisible");
            $(".Wordcloud").removeClass("invisible");
            $(".Wordcloud div").removeClass("invisible");
			$("#wolk").css("display","block");
            $("#wolk").addClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");
            $(".nav-link").removeClass("active");

            $(this).addClass("active");
    });
    
    $("#btn_graph").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Graph").removeClass("invisible");
            $(".Graph div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").addClass("grid_8 vert_8");

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
    });
	$("#btn_other").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Other").removeClass("invisible");
            $(".Other div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#darkmode").click(function(){
	    if(dmode == true) {
			dmode = false;
			$("*").removeClass("darkmode");
		}
        else if(dmode == false) {
			dmode = true;
			$("*:not(#graph,#graph *)").addClass("darkmode");
		}
		var current = $("#darkmode").attr("src");
		var swap = $("#darkmode").attr("data-swap");     
		$("#darkmode").attr('src', swap).attr("data-swap",current);
		current = $("#sort").attr("src");
		swap = $("#sort").attr("data-swap");  
		$("#sort").attr('src', swap).attr("data-swap",current);
		current = $("#filter").attr("src");
		swap = $("#filter").attr("data-swap");  
		$("#filter").attr('src', swap).attr("data-swap",current);
		current = $("#settings").attr("src");
		swap = $("#settings").attr("data-swap");  
		$("#settings").attr('src', swap).attr("data-swap",current);
    });

	$("#notification").click(function(){
	    if(smode == true) {
			smode = false;
		}
        else if(smode == false) {
			smode = true;
		}
		var current = $("#notification").attr("src");
		var swap = $("#notification").attr("data-swap");     
		$("#notification").attr('src', swap).attr("data-swap",current);
    });

    $("body").on('DOMSubtreeModified','#tweet',function() {
		if(smode) {
			audio["noti"].pause();
			audio["noti"].currentTime = 0;
			audio["noti"].play();
		}

    $("body").on('DOMSubtreeModified','#importanttweet',function() {
    	if(dmode) {
	        $("#importanttweet div").addClass("darkmode");
	    }
    });
	
	$("body").on('DOMSubtreeModified','#hashtags',function() {
        if(dmode) {
            $(".hashtagdiv").addClass("darkmode");
            $(".hashtagp").addClass("darkmode");
        }
    });

    $("body").on('DOMSubtreeModified','#locations',function() {
        if(dmode) {
            $(".locationdiv").addClass("darkmode");
            $(".locationp").addClass("darkmode");
        }
    });
});
