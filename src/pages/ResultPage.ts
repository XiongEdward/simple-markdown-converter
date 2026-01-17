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
            output: 'html',
            nonStandard: true  // Enable \(...\) and \[...\] syntax
        }));
    }

    private preprocessMarkdown(markdown: string): string {
        // Replace \[ ... \] with $$ ... $$
        // Adding newlines around the block to ensure marked recognizes it as a block element
        let processed = markdown.replace(/\\\[([\s\S]*?)\\\]/g, '\n$$$$$1$$$$\n');

        // Replace \( ... \) with $ ... $
        // We need to be careful not to match inside code blocks, but for a simple converter 
        // a global replace is usually sufficient for this specific AI output format.
        processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

        return processed;
    }

    async loadContent(): Promise<void> {
        const rawMarkdown = sessionStorage.getItem('markdown') || '';
        const markdown = this.preprocessMarkdown(rawMarkdown);

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
