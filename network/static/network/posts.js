
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

/*function get_user(username, value){
  fetch(`/profile/${username}`, {
    method: 'PUT',
    body: JSON.stringify({
        follow = value
    })
  }).catch((error) => {
        console.log(error);
  });
}*/

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
        profile_html(posts, username);   
      })
      .catch((error) => {
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
          view_profile();
          profile_posts(post.username);
          
        });
            view.append(item);
          });

        

}

function profile_html(posts, username) {
  fetch(`follow/${username}`)
  .then(response => response.json())
    .then( follow => {
      clear_profile();
      const view = document.querySelector('#header');
      let header = document.createElement('H3');
      header.innerHTML = `${username}`;
      var is_follower = follow ? 'Follow' : 'Unfollow';
      let follow_button = document.createElement('Button');
      follow_button.innerHTML = `${is_follower}`;
      follow_button.className = `btn btn-sm btn-outline-primary`;
      follow_button.addEventListener('click', function(){
          follow_user(username, posts);
      });
      view.append(header);
      view.append(follow_button);

      const main = document.querySelector('#main');
      posts.forEach((post) => {
        let item = document.createElement('div');
        item.innerHTML = `
        <div class="border main">
        <div>${post.text}</div>
        <div>${post.timestamp}</div>
        </div>
        `;
        main.append(item);
      });
      
   }).catch((error) => {
        console.log(error);
  });

}



function follow_user(username, posts){
  fetch(`follow/${username}`, {
    method: 'PUT',
    body: JSON.stringify({
        followed: username
    }).then(profile => {
      profile_html(posts, username)
    })
  }).catch((error) => {
        console.log(error);
  });
}

function clear_profile(){
  document.querySelector('#header').innerHTML = '';
  document.querySelector('#main').innerHTML = '';
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