
document.addEventListener('DOMContentLoaded', function() {
//BY DEFAULT LOAD ALL POSTS
all_posts();
posts_view();

document.querySelector('#submit-new-post').addEventListener('click', create_post);

});

function posts_view(){
  document.querySelector('#posts-view').style.display = 'block';
  document.querySelector('#profile-view').style.display = 'none';
}
function view_profile(){
  document.querySelector('#profile-view').style.display = 'block';
  document.querySelector('#posts-view').style.display = 'none';
}


function all_posts() {
  fetch('/posts')
    .then(response => response.json())
      .then( posts => {
        html_for_posts(posts, '#all-posts');        
      }).catch((error) => {
          console.log(error);
    });
}

function profile_posts(username) {
  event.preventDefault();
  fetch(`/profile/${username}`)
    .then(response => response.json())
      .then( posts => {
        html_for_posts(posts, '#profile-posts');        
      }).catch((error) => {
          console.log(error);
    });
}


function create_post() {
  const text = document.querySelector('#post-text').value;
  fetch(`/posts/compose`, {
    method: 'POST',
    body: JSON.stringify({
        text:text
    })
  })
  .then(response => response.json())
  .then(result => {
    show_all;
  }).catch((error) => {
        console.log(error);
  });
  
}

function html_for_posts(posts, doc){
  const view = document.querySelector(doc);
        posts.forEach((post) => {
        let item = document.createElement('div');
          item.innerHTML = `
          <div class="container">
            <div id="row" class="border row">
              <div class="col-sm">
              <a href="">${post.username}</a>
                <div id="user"></div>
              </div>
              <div class="col-sm">
                <div> ${post.text}</div>
              </div>
              <div class="col-sm">
                <div> post.likes</div>
              </div>
              <div class="col-sm" style="text-align:right;">
                 ${post.timestamp}
              </div>

            </div>
          </div>
          `;
          item.addEventListener('click', function() {
          profile_posts(post.username);
          view_profile();
        });
            view.append(item);
          });

}

function html_follow_button(username){

  /*var is_archived = email.archived ? 'Unarchive' : 'Archive';
  let archive_button = document.createElement('BUTTON');
      archive_button.innerHTML = `${is_archived}`;
      archive_button.className = `btn btn-sm btn-outline-danger`;
      archive_button.addEventListener('click', function() {
        archive(email);
        });
        */
      
}







/*function like(post_id, value){
  fetch(`posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        likes =+ value
    })
  }).catch((error) => {
        console.log(error);
  });
}*/