hljs.initHighlightingOnLoad();

$(document).ready(function(){

    $("h2,h3,h4,h5,h6").each(function(i,item){
       var tag = $(item).get(0).localName;
       $(item).attr("id","dir"+i);
       if($(item).attr('id') != "dir0" && $(item).attr('id') != "dir1")
          $("#category").append('<a style="color:black;" class="new'+tag+'" href="#dir'+i+'">'+$(this).text()+'</a></br>');
       $(".newh2").css("margin-left",25);
       $(".newh3").css("margin-left",45);
       $(".newh4").css("margin-left",65);
       $(".newh5").css("margin-left",85);
       $(".newh6").css("margin-left",105);
      });

    $("#category").hide();
});

$("#dir_control").click(function() {
	$("#category").toggle(function() {
		$("#dir_control").toggleClass("fa fa-plus fa fa-minus")
	})
});
