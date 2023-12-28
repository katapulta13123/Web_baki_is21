import {ProductCardComponent} from "../../Components/product-card/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {peerId1, peerId2} from "../../modules/consts.js";
import {ProductPage} from "../products/index.js";



export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentPeerId = peerId1;
        
    }
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-column">
                <button id="refresh-button" class="double-border-button">Востановить</button>
                <div id="product-cards-container" class="d-flex flex-wrap"></div>
                <button id="toggle-button" class="double-border-button">Переключить ID</button>
            </div>
        `;
    }
    
    renderData(items) {
        // Очищаем контейнер перед отображением новых карточек
        if (this.productCardsContainer) {
            this.productCardsContainer.innerHTML = '';
        } else {
            this.productCardsContainer = document.createElement('div');
            this.productCardsContainer.id = 'product-cards-container';
            this.productCardsContainer.classList.add('d-flex', 'flex-wrap');
            this.pageRoot.appendChild(this.productCardsContainer);
            productCard.cardElement.classList.add('mr-3');
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.productCardsContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    updateDataWithPeerId(peerId) {
        ajax.post(urls.getConversationMembers2(peerId), (data) => {
            this.renderData(data.response.profiles);
        });
    }
    getData() {
        ajax.post(urls.getConversationMembers2(), (data) => {
            this.renderData(data.response.profiles)
        })
        this.ePeerId()
    }
    togglePeerId() {
        ajax.get(urls.GetUpdatePeer())
        this.updateDataWithPeerId(this.currentPeerId);
    }
    ePeerId() {
        this.updateDataWithPeerId(this.currentPeerId);
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    
        const refreshButton = document.getElementById('refresh-button');
        refreshButton.addEventListener('click', () => {
            this.ePeerId();
        });
    
        const toggleButton = document.getElementById('toggle-button');
        toggleButton.addEventListener('click', () => {
            this.togglePeerId();
        });
    }
    
}