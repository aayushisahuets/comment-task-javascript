(function(){
  'use strict';

    let comments = [];
    let currentPage = 1;
    let mod = 0;

        function renderComments(){
          comments = LocalgetItem();
           if(!comments)
           return;
           let html = document.getElementById("list");
            html.innerHTML = "";
           let end = 5 * currentPage;
           let start = end - 5;
           comments.map((obj, i) => {
            if(i>= start && i < end)
                jQuery('<tr/>')
                    .append(`<td>${obj.message}</td><td>${obj.datetime}</td>`)
                    .attr('class', 'table table-bordered')
                    .attr('id', 'hide_comments')
                    .appendTo("#list");
            })
           paginate();
        }

        renderComments();   
        {
         jQuery(document).on('click','.submit-button',function(e){
          jQuery(window).keydown(function(event){
            if(event.keyCode === 13)
              if (!event.shiftKey) {
                event.preventDefault();
                let commentTxt = document.getElementById("commentTxt").value;
                commentTxt = jQuery.trim(commentTxt);
                    if(commentTxt){
                        let comment = { 
                                      message: commentTxt, 
                                      datetime: new Date().toLocaleString()
                                      };
                            if(!comments)
                               comments = [];
                        comments.unshift(comment);//unshift() add items to the beginning of the  array.
                        LocalsetItem();
                        renderComments();
                        paginate();
                    document.getElementById("commentTxt").value = "";
                    }
              }
            });
          });
        };
           
        // jQuery(document).on('click','.submit-button',function(e){//it works like onclick function()
        //     event.preventDefault();
        //     let commentTxt = document.getElementById("commentTxt").value;
        //         commentTxt = jQuery.trim(commentTxt);
        //             if(commentTxt){
        //                 let comment = { 
        //                               message: commentTxt, 
        //                               datetime: new Date().toLocaleString()
        //                               };
        //                     if(!comments)
        //                        comments = [];
        //                 comments.unshift(comment);//unshift() add items to the beginning of the  array.
        //                 LocalsetItem();
        //                 renderComments();
        //                 paginate();
        //             document.getElementById("commentTxt").value = "";
        //             }
        // });

        // functionality of delete button
        jQuery("#deleteButton").click(function(){
            localStorage.removeItem('comments');
            history.go(0);
        });
      
        jQuery(document).on('click','.page-item',function(e) {
            e.preventDefault();//eg:Clicking on a "Submit" button, prevent it from submitting a form
            switch(e.currentTarget.id){
                case  "prevPage" :
                  if(currentPage > 1)
                  currentPage = currentPage-1;
                  break;
                case "nextPage":
                  if(currentPage <= mod-1)
                  currentPage = currentPage+1;
                  break;
                default : 
                  currentPage = parseInt(e.currentTarget.id);
                  break;
            }
            renderComments();
            paginate();
        });

        function paginate(){
            let count = comments.length;
            let paginator = document.getElementById('pagination');
            paginator.innerHTML ="";
          jQuery('<li/>')
            .attr('class', 'page-item')
            .attr('id', 'prevPage').appendTo("#pagination");
          jQuery("<a/>")
            .attr("class", "page-link")
            .attr("id", "prev")
            .text("Previous") 
            .appendTo("#prevPage");
           
            if(count%5 ===0){
                mod = Math.round(count/5);
            }
            else if(count%5 <= 2){
                mod = Math.round(count/5)+1;
            }
            else{
                mod = Math.round(count/5);
            }
            for (let i = 0; i < mod; i++)
            {
              jQuery('<li/>')
                .attr('class', 'page-item')
                .attr('id', `${i+1}`)
                .appendTo("#pagination");
              jQuery("<a/>")
                .attr("class", `page-link ${currentPage==i+1 ? "activePage" : ""}`)
                .attr("id", `page_${i}`)
                .text(i+1) 
                .appendTo(`#${i+1}`);
            }
              jQuery('<li/>')
                .attr('class', 'page-item')
                .attr('id', 'nextPage')
                .appendTo("#pagination");
              jQuery("<a/>")
                .attr("class", "page-link")
                .attr("id", "next")
                .text("Next") 
                .appendTo("#nextPage");
        }
             
        function LocalsetItem(){
          localStorage.setItem('comments', JSON.stringify(comments));//JSON.stringify converts object into string
        }

        function LocalgetItem(){
          let display = JSON.parse(localStorage.getItem('comments'));//await keyword makes the fn wait for a promise.async & await depends on each other
          return display;
        }
})();