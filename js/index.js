let comments = [];
let CurrentPage = 1;
let mod = 0;

    function addComment() {
      let commentTxt = document.getElementById("commentTxt").value;
      let comment = { 
                    message: commentTxt, 
                    datetime: new Date().toLocaleString()
                    };
      comments.push(comment);
      renderComments();
      paginate();
      LocalsetItem();
    }

    function renderComments(){
       let html ="";
       let end = 5 * CurrentPage;
       let start = end - 5;
       comments.map((obj, i) => {
        if(i>= start && i < end)
          html += `<li class="list-group-item input-list">${obj.message} &nbsp;&nbsp; ${obj.datetime}</li>`;
        })
      document.getElementById("list").innerHTML = html;
      LocalgetItem();
    }

    function handleJumpToPage(jumpTo){
       CurrentPage = jumpTo;
       renderComments();
       paginate();
    }

    function handleNext(){
        if(CurrentPage <= mod-1)
            CurrentPage = CurrentPage+1;
            renderComments();
            paginate();
    }

    function handlePrev(){
        if(CurrentPage > 1)
            CurrentPage = CurrentPage-1;
            renderComments();
            paginate();
     }

    function paginate() {
      let count = comments.length;
      let paginator = document.getElementById('pagination');
      let str = `<li class="page-item" onclick="handlePrev()">
                    <a class="page-link" id="prev">Previous</a>
                </li>`;

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
        str += `<li class="page-item" onclick="handleJumpToPage(${i+1})">
                    <a class="page-link ${CurrentPage==i+1 ? "activePage" : ""}">${i+1}</a>
                </li>`;
      }
      str += `<li class="page-item" onclick="handleNext()"><a id="next" class="page-link">Next</a></li>`;
      paginator.innerHTML = str;
    }

    function LocalsetItem(){
        // let display = document.getElementById("commentTxt").value;
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function LocalgetItem(){
        let display = localStorage.getItem('comments');
        // document.getElementById("displayItem").value = display;
        document.getElementById('displayItem').innerHTML = display;

    }







    // function LocalgetItem(){
    //     JSON.parse(localStorage.getItem( 'comments'));
    // }

    // function LocalsetItem(){
    //     localStorage.setItem( 'comments', JSON.stringify(comments));
    // }
// })();   
    // function handlePrev(){
    //   if(CurrentPage > 1)
    //     // document.getElementById("prev").classList.add(".disabledBtn");
    //     // element.classList.add("disabledBtn");
    //     // return
    //      // document.getElementById("prev").classList.remove("disabledBtn");
    //       CurrentPage = CurrentPage-1
    //       renderComments();
    //       paginate();
    // }
    // function handleNext(){
    //   if(CurrentPage === mod-1)
    //     return;
    //   CurrentPage = CurrentPage+1;
    //   renderComments();
    //   // paginate();

    // }
// function mySave() {
//         var myContent = document.getElementById("myTextarea").value;
//         localStorage.setItem("myContent", myContent);
//       }
//       function myLoad() {
//         var myContent = localStorage.getItem("myContent");
//         document.getElementById("myTextarea").value = myContent;
//       }