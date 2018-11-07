import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', editState);
document.querySelector('.card-form').addEventListener('click', addState);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

function submitPost()  {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const payload = {
        title,
        body
    };

    if (id === '')  {
        http.post('http://localhost:3000/posts', payload)
        .then(data => {
            ui.showAlert('Post Added!', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));    
    }
    else    {
        http.put(`http://localhost:3000/posts/${id}`, payload)
        .then(data => {
            ui.showAlert('Post Updated!', 'alert alert-success');
            ui.changeFormState('add');
            getPosts();
        })
        .catch(err => console.log(err));
    }
}

function deletePost(event)   {
    if (event.target.parentElement.classList.contains('delete'))    {
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

function editState(event)    {
    if (event.target.parentElement.classList.contains('edit'))  {
        const id = event.target.parentElement.dataset.id;
        const body = event.target.parentElement.previousElementSibling.textContent;
        const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const payload = {
            id,
            title,
            body
        };
        ui.fillFields(payload);
    }
    event.preventDefault();
}

function addState(event) {
    if (event.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    event.preventDefault();
}
