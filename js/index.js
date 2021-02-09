(function(){
  'use strict';

    let comments = [];
    let CurrentPage = 1;
    let mod = 0;

        async function renderComments(){
          comments = await LocalgetItem();
           if(!comments)
           return;
           let html = document.getElementById("list");
            html.innerHTML = "";
           let end = 5 * CurrentPage;
           let start = end - 5;
           comments.map((obj, i) => {
            if(i>= start && i < end)
                jQuery('<li/>')
                    .attr('class', 'list-group-item input-list')
                    .text(`${obj.message} ${obj.datetime}`)//backtick operator(``)
                    .appendTo("#list");
            })
           paginate();
        }

        jQuery(document).ready(function() {
          jQuery(window).keydown(function(event){
            if(event.keyCode === 13)
              if (!event.shiftKey) {
                event.preventDefault();
                let commentTxt = document.getElementById("commentTxt").value;
                let comment = { 
                              message: commentTxt, 
                              datetime: new Date().toLocaleString()
                              };
                    if(!comments)
                       comments = [];
                comments.unshift(comment);//unshift() add items to the beginning of the  array.
                paginate();
                renderComments();
                LocalsetItem();
                location.reload();//reload the current document
             }
           });
        });

        jQuery(document).ready(async function(){//it works like onclick function()
           renderComments();
        })

        jQuery(document).on('click','.page-item',function(e) {
            e.preventDefault();//eg:Clicking on a "Submit" button, prevent it from submitting a form
              // debugger;
            switch(e.currentTarget.id){
                case  "prevPage" :
                  if(CurrentPage > 1)
                  CurrentPage = CurrentPage-1;
                  break;
                case "nextPage":
                  if(CurrentPage <= mod-1)
                  CurrentPage = CurrentPage+1;
                  break;
                default : 
                  CurrentPage = parseInt(e.currentTarget.id);
                  break;
            }
            paginate();
            renderComments();
        });

        function paginate(){
            let count = comments.length;
            let paginator = document.getElementById('pagination');
            paginator.innerHTML =""
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
                .attr("class", `page-link ${CurrentPage==i+1 ? "activePage" : ""}`)
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

        async function LocalgetItem(){
          let display = JSON.parse(await localStorage.getItem('comments'));//await keyword makes the fn wait for a promise.async & await depends on each other
          return display;
        }
})();



