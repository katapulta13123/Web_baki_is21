import { ProductComponent } from "../../components/products/index.js";
import { BackButtonComponent } from "../../components/button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id, title) {
        this.parent = parent
        this.id = id
    }

    getData() {
        return {
            id: 1,
            src: "https://cdn-icons-png.flaticon.com/512/5404/5404757.png",
            title: `Продукт: ${this.id}`,
            text: "Уже в вашей корзине!"
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)
    }
}