export class InputPage {
    private container: HTMLDivElement;
    private textarea: HTMLTextAreaElement;
    private button: HTMLButtonElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'input-page';

        this.textarea = document.createElement('textarea');
        this.textarea.placeholder = '在此粘贴 Markdown 文本...';

        this.button = document.createElement('button');
        this.button.className = 'convert-btn';
        this.button.textContent = '转换';
        this.button.addEventListener('click', () => this.handleConvert());

        this.container.appendChild(this.textarea);
        this.container.appendChild(this.button);
    }

    private handleConvert(): void {
        const markdown = this.textarea.value.trim();
        if (markdown) {
            // Store markdown in sessionStorage
            sessionStorage.setItem('markdown', markdown);
            // Navigate to result page
            window.location.hash = '#result';
        }
    }

    render(): HTMLDivElement {
        return this.container;
    }

    show(): void {
        this.container.classList.remove('hidden');
    }

    hide(): void {
        this.container.classList.add('hidden');
    }
}
