hljs.initHighlightingOnLoad();

$(document).ready(function(){

    var total_posts = 0;

    $("h2,h3,h4,h5,h6").each(function(i,item){
       var tag = $(item).get(0).localName;

       $("a").each(function(i_a,item_a){
         var tag_a = $(item_a).get(0).localName;
         total_posts++;
       });

       $(item).attr("id","dir"+i);
       if($(item).attr("id") != "dir0" && $(item).text() != "목차 ")
          $("#category").append('<a style="color:black;" class="new'+tag+'" href="#dir'+i+'">'+$(this).text()+'</a></br>');
       $(".newh2").css("margin-left",25);
       $(".newh3").css("margin-left",45);
       $(".newh4").css("margin-left",65);
       $(".newh5").css("margin-left",85);
       $(".newh6").css("margin-left",105);
       $("#category_count").html("총").append(i).append("개의 Categories, ").append(total_posts).append("개의 Posts");
    });

    $("#category").hide();
});

$("#dir_control").click(function() {
	$("#category").toggle(function() {
		$("#dir_control").toggleClass("fa fa-plus fa fa-minus")
	})
});
