export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3" style="width: 1200px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title text1" style = "">${data.title}</h5>
                            <p class="card-text text2">${data.text}</p>
                        </div>
                    </div>
                </div>
            
            
            <button type="button" class="btn btn-primary" id="liveToastBtn">Показать номер застройщика</button>
            <div class="toast-container">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="https://external-preview.redd.it/DS0bwPzzIZ7X5KyohxiKMhTo35cdHpmWjkZQ4IMyuXE.jpg?auto=webp&s=95ee36556ae5c35aaf3b76c8f82a9745a66b3671" class="rounded me-2" alt="..." style="width: 50px">
                        <strong class="me-auto">Здравствуйте!</strong>
                        <small>Только что</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                <div class="toast-body">Мы рады что вам приглянулась квартира, номер застройщика: 8 800 222 35-35</div>
            </div>
        </div>
    </div>
    
            `
        );
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}