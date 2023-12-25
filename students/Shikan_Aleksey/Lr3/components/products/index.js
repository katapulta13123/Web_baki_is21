export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div id=cardd" class="card mb-3" style="width: 700px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div id="product-cb" class="card-body">
                                <h5 id="product-cti" class="card-title">${data.title}</h5>
                                    <span class="vitamin">
                                        <h6 class="badge rounded-pill text-bg-primary">A1</h6>
                                        <h6 class="badge rounded-pill text-bg-secondary">B6</h6>
                                        <h6 class="badge rounded-pill text-bg-warning">C</h6>
                                        <h6 class="badge rounded-pill text-bg-info">D6</h6>
                                    </span>
                                <p id="product-cte" class="card-text">${data.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}