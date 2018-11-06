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
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
}

export const ui = new UI();
