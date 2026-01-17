import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

export class ResultPage {
    private container: HTMLDivElement;
    private contentDiv: HTMLDivElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'result-page';

        this.contentDiv = document.createElement('div');
        this.contentDiv.className = 'result-content';

        this.container.appendChild(this.contentDiv);

        // Configure marked with KaTeX support
        marked.use(markedKatex({
            throwOnError: false,
            output: 'html'
        }));
    }

    async loadContent(): Promise<void> {
        const markdown = sessionStorage.getItem('markdown') || '';

        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
        });

        // Convert markdown to HTML
        const html = await marked.parse(markdown);
        this.contentDiv.innerHTML = html as string;
    }

    render(): HTMLDivElement {
        return this.container;
    }

    show(): void {
        this.container.classList.remove('hidden');
        this.loadContent();
    }

    hide(): void {
        this.container.classList.add('hidden');
    }
}
