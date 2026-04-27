let posts = [];

// Load JSON data
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    posts = data;
    showPosts();
  });

function showPosts() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.slice().reverse().forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<p>${post.content}</p><small>${post.time}</small>`;
    feed.appendChild(div);
  });
}

function addPost() {
  const input = document.getElementById("postInput");
  const content = input.value;

  if (content === "") return;

  const newPost = {
    id: Date.now(),
    content: content,
    time: "Just now"
  };

  posts.push(newPost);
  showPosts();

  input.value = "";
}