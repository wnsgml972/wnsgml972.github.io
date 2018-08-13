hljs.initHighlightingOnLoad();

if(!window.location.href.includes("resume") || !window.location.href.includes("archive")){
    $(document).ready(function(){

        var total_posts = 0;
        var control_num = 0;

        $("h2,h3,h4,h5,h6").each(function(i,item){
           var tag = $(item).get(0).localName;

           if(control_num == 0){
             $(".date").each(function(i_a, item_a){
              total_posts++;
             });
           }

           $(item).attr("id","dir"+i);
           if($(item).attr("id") != "dir0" && $(item).text() != "목차 ")
              $("#category").append('<a style="color:black;" class="new'+tag+'" href="#dir'+i+'">'+$(this).text()+'</a></br>');

           $(".newh2").css("margin-left",25);
           $(".newh3").css("margin-left",45);
           $(".newh4").css("margin-left",65);
           $(".newh5").css("margin-left",85);
           $(".newh6").css("margin-left",105);
           $("#category_count").html("총").append(i).append("개의 Categories, ").append(total_posts).append("개의 Posts");

           control_num++;

        });

        $("#category").hide();
    });
}

if(window.location.href.includes("resume")){
    $(document).ready(function(){
      for(var i=1; i<=5; i++){
        $("#category_resume" + i).hide();
      }
    });
}

$("#dir_control").click(function() {
	$("#category").toggle(function() {
		$("#dir_control").toggleClass("fa fa-plus fa fa-minus")
	})
});

if(window.location.href.includes("resume")){
  $("#dir_control_resume1").click(function() {
    $("#category_resume1").toggle(function() {
      $("#dir_control_resume1").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_resume2").click(function() {
    $("#category_resume2").toggle(function() {
      $("#dir_control_resume2").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_resume3").click(function() {
    $("#category_resume3").toggle(function() {
      $("#dir_control_resume3").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_resume4").click(function() {
    $("#category_resume4").toggle(function() {
      $("#dir_control_resume4").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_resume5").click(function() {
    $("#category_resume5").toggle(function() {
      $("#dir_control_resume5").toggleClass("fa fa-plus fa fa-minus")
    })
  });
}
