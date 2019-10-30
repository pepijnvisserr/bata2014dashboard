var dmode = false;

$(document).ready(function(){
    $("#visuals div").addClass("invisible");
    $(".Wordcloud").removeClass("invisible");
    $(".Wordcloud div").removeClass("invisible");

    $("#btn_cloud").click(function(){ 
        $("#visuals > div").addClass("invisible");
            $(".Wordcloud").removeClass("invisible");
            $(".Wordcloud div").removeClass("invisible");
            $("#wolk").addClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");
            //$("#geolocation").removeClass("grid_8 vert_4");

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#btn_geo").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Geolocation").removeClass("invisible");
            $(".Geolocation div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");
            //$("#geolocation").addClass("grid_8 vert_4");

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#btn_graph").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Graph").removeClass("invisible");
            $(".Graph div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").addClass("grid_8 vert_8");
            //$("#geolocation").removeClass("grid_8 vert_4");

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
    });
	$("#btn_other").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Other").removeClass("invisible");
            $(".Other div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");
            //$("#geolocation").addClass("grid_8 vert_4");

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
			$("*").addClass("darkmode");
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

    $("body").on('DOMSubtreeModified','#tweet',function() {
    	if(dmode) {
	        $("#tweet div").addClass("darkmode");
	    }
    });

    $("body").on('DOMSubtreeModified','#importanttweet',function() {
    	if(dmode) {
	        $("#importanttweet div").addClass("darkmode");
	    }
    });
});
