hljs.initHighlightingOnLoad();

if(!window.location.href.includes("/cv") && !window.location.href.includes("/archive")){
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

if(window.location.href.includes("/cv")){
    $(document).ready(function(){
      for(var i=1; i<=5; i++){
        $("#category_cv" + i).hide();
      }
    });
}

if(window.location.href.includes(".html")){
  $("#dir_control").click(function() {
    $("#category").toggle(function() {
      $("#dir_control").toggleClass("fa fa-plus fa fa-minus")
    })
  });
}

if(window.location.href.includes("/archive")){
  $("#dir_control2019").click(function() {
    $("#category2019").toggle(function() {
      $("#dir_control2019").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control2018").click(function() {
    $("#category2018").toggle(function() {
      $("#dir_control2018").toggleClass("fa fa-plus fa fa-minus")
    })
  });
}


if(window.location.href.includes("/category")){
  $("#dir_control").click(function() {
    $("#category").toggle(function() {
      $("#dir_control").toggleClass("fa fa-plus fa fa-minus")
    })
  });
}

if(window.location.href.includes("/cv")){
  $("#dir_control_cv1").click(function() {
    $("#category_cv1").toggle(function() {
      $("#dir_control_cv1").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_cv2").click(function() {
    $("#category_cv2").toggle(function() {
      $("#dir_control_cv2").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_cv3").click(function() {
    $("#category_cv3").toggle(function() {
      $("#dir_control_cv3").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_cv4").click(function() {
    $("#category_cv4").toggle(function() {
      $("#dir_control_cv4").toggleClass("fa fa-plus fa fa-minus")
    })
  });
  $("#dir_control_cv5").click(function() {
    $("#category_cv5").toggle(function() {
      $("#dir_control_cv5").toggleClass("fa fa-plus fa fa-minus")
    })
  });
}
