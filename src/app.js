import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);

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
