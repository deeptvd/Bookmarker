//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save Bookmark
function saveBookmark(e) {
  //Get form values
  var sitename = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(sitename, siteUrl)){
    return false;
  }

  var bookmark = {
    name:sitename,
    url:siteUrl
  }
  console.log(bookmark);
  //Local Storage Test
  // localStorage.setItem('test', 'Hello World!');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test')
  // console.log(localStorage.getItem('test'));


  //Test if bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    //Init array
    var bookmarks = [];
    //push the values
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Reset to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  //Clear form
  document.getElementById('myForm').reset();

  //Refetch bookmarks
  fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}


function fetchBookmarks() {
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i<bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class = "card"><div class="card-block">' +
                                      '<h3 class="card-text">' +name+
                                        ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
                                        '</h3>'+
                                        '</div></div>';
  }
}

function deleteBookmark(url) {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop through bookmarks
  for(var i=0; i<bookmarks.length;i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i,1);
    }
  }
  //Reset to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Refetch bookmarks
  fetchBookmarks();

}

function validateForm(sitename, siteUrl) {
  if(!sitename || !siteUrl){
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
