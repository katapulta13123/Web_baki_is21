import {ProductCardComponent} from "../../components/product-card/CRDindex.js";
import {ProductPage} from "../product/PRDindex.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
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
                src: "https://i1.sndcdn.com/artworks-VywksQLWOwlBgiIh-0DHYbg-t500x500.jpg",
                title: "Купи свою мечту!",
                text: "Добро пожаловать в самый яркий и разнообразный район gm_construct! Здесь вас ждет уникальная возможность приобрести собственное жилье и создать комфортную и стильную квартиру для себя и своей семьи."
            },
            {
                id: 2,
                src: "https://steamuserimages-a.akamaihd.net/ugc/540690546175406904/3FF38753E37041A99585F33366F489490467A1FA/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
                title: "Открой новую страницу в своей жизни!",
                text: "Приветствуем вас в городе gm_bigcity! Здесь вас ждет уникальная возможность воплотить свои мечты в реальность и обзавестись собственным жильем, которое станет идеальным укрытием для тебя и твоей семьи."
            },
            {
                id: 3,
                src: "https://steamuserimages-a.akamaihd.net/ugc/545258778414516136/06DE808A2D64593D535145E1E9553F92FA9535F6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
                title: "Найди свой уютный уголок!",
                text: "Отойди от городской суеты и открой новые горизонты в прекрасном мире gm_fork! У нас ты найдешь квартиры, которые расположены вдали от шума и суеты городской жизни!"
            },
        ]
    }
        
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()

        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')
            if (toastTrigger) {
                toastTrigger.addEventListener('click', () => {
                const toast = new bootstrap.Toast(toastLiveExample)

            toast.show()})
        }
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

