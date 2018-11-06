import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

function submitPost()  {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const payload = {
        title,
        body
    };

    http.post('http://localhost:3000/posts', payload)
        .then(data => {
            ui.showAlert('Post Added!', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));
}

function deletePost(event)   {
    if (event.target.parentElement.classList.contains('delete'))    {
        console.log(event.target.parentElement.classList.dataset);
        const id = event.target.parentElement.dataset.id;
        if (confirm('Delete this post?'))   {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post deleted!', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
    event.preventDefault();
}
