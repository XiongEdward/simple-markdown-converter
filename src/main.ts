import './style.css';
import { InputPage } from './pages/InputPage';
import { ResultPage } from './pages/ResultPage';

class App {
    private appElement: HTMLElement;
    private inputPage: InputPage;
    private resultPage: ResultPage;

    constructor() {
        this.appElement = document.querySelector<HTMLDivElement>('#app')!;
        this.inputPage = new InputPage();
        this.resultPage = new ResultPage();

        // Render both pages
        this.appElement.appendChild(this.inputPage.render());
        this.appElement.appendChild(this.resultPage.render());

        // Setup routing
        this.setupRouting();

        // Initial route
        this.navigate();
    }

    private setupRouting(): void {
        window.addEventListener('hashchange', () => this.navigate());
    }

    private navigate(): void {
        const hash = window.location.hash;

        if (hash === '#result') {
            this.inputPage.hide();
            this.resultPage.show();
        } else {
            this.resultPage.hide();
            this.inputPage.show();
        }
    }
}

// Initialize app
new App();
