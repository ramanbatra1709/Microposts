class UI    {
    constructor()   {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    showPosts(posts) {
        let outputHTML = '';
        posts.forEach((post) => {
            outputHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        this.posts.innerHTML = outputHTML;
    }
    showAlert(msg, className) {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        document.querySelector('.postsContainer').insertBefore(div, document.querySelector('#posts'));
        setTimeout(() => this.clearAlert(), 3000);
    }
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert)   {
            currentAlert.remove();
        }
    }
    clearFields()   {
        this.idInput.value = '';
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
    fillFields(data)    {
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.changeFormState('edit');        
    }
    changeFormState(state)  {
        if (state === 'edit')   {
            this.postSubmit.textContent = 'Edit post';
            this.postSubmit.className = 'post-submit btn btn-block btn-warning';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'post-cancel btn btn-light btn-block';
            cancelBtn.appendChild(document.createTextNode('Cancel'));
            document.querySelector('.card-form').insertBefore(cancelBtn, document.querySelector('.form-end'));
        }
        else    {
            this.postSubmit.textContent = 'Post';
            this.postSubmit.className = 'post-submit btn btn-block btn-primary';
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.clearFields();
        }
    }
}

export const ui = new UI();
