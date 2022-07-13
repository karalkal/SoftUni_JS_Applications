export { showPostDetails };
const homeSection = document.getElementById("homeView");
const detailsSection = document.getElementById("detailsView");
const commentForm = detailsSection.querySelector('div.answer\-comment div.answer form')


async function showPostDetails(postID) {
    homeSection.style.display = 'none';
    detailsSection.style.display = 'block';
    try {
        let res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postID}`);
        if (res.ok != true) {
            let error = res.json();
            throw new Error(error.message);
        }
        let data = await res.json();
        // console.log(data)
        displayPost(data);
    } catch (error) {
        alert(error.message);
    }
}


function displayPost(data) {
    let postTitle = document.querySelector('div.theme-name h2');
    postTitle.innerHTML = data.topic;
    let commentDiv = document.querySelector('div.comment');
    commentDiv.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${data.username}</span> posted on <time>${data.date}</time></p>
        <p class="post-content">${data.content}</p>
    </div>
    `
    displayRelatedComments(data)

}


function displayRelatedComments(data) {
    console.log(data._id)

}

function postNewComment() {

}