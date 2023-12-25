import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../../pages/product/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById ('main-page') 
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://klike.net/uploads/posts/2022-09/1662040170_j-50.jpg",
                title: "Яблоко",
                text: "Сочный плод яблони, который употребляется в пищу в свежем и запеченном виде, служит сырьём в кулинарии и для приготовления напитков."
            },
            {
                id: 2,
                src: "https://gas-kvas.com/grafic/uploads/posts/2023-09/1695916866_gas-kvas-com-p-kartinki-banan-2.jpg",
                title: "Банан",
                text: "Название съедобных плодов культивируемых растений рода Банан; обычно под таковыми понимают Musa acuminata и Musa × paradisiaca, а также Musa balbisiana"
            },
            {
                id: 3,
                src: "https://proprikol.ru/wp-content/uploads/2020/08/kartinki-kivi-11.jpg",
                title: "Киви",
                text: "Название плодов культурных сортов растений рода Актинидия. Сами растения представляют собой крупные древовидные лианы родом из Китая."
            },
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
        
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}