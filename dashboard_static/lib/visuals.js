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

            $("*li.nav-item a").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#btn_geo").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Geolocation").removeClass("invisible");
            $(".Geolocation div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").removeClass("grid_8 vert_8");
            //$("#geolocation").addClass("grid_8 vert_4");

            $("*li.nav-item a").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#btn_graph").click(function(){
        $("#visuals > div").addClass("invisible");
            $(".Graph").removeClass("invisible");
            $(".Graph div").removeClass("invisible");
            $("#wolk").removeClass("grid_8 vert_8");
            $("#graph").addClass("grid_8 vert_8");
            //$("#geolocation").removeClass("grid_8 vert_4");

            $("*li.nav-item a").removeClass("active");
            $(this).addClass("active");
    });
    
    $("#darkmode").click(function(){
            $("*").toggleClass("darkmode");
    });
});