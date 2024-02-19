"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metascraper_1 = __importDefault(require("metascraper"));
const metascraper_url_1 = __importDefault(require("metascraper-url"));
const metascraper_title_1 = __importDefault(require("metascraper-title"));
const metascraper_author_1 = __importDefault(require("metascraper-author"));
const metascraper_publisher_1 = __importDefault(require("metascraper-publisher"));
const metascraper_date_1 = __importDefault(require("metascraper-date"));
const metascraper_semanticscholar_js_1 = __importDefault(require("./metascraper-semanticscholar.js"));
(() => {
    const scrap = (0, metascraper_1.default)([
        (0, metascraper_semanticscholar_js_1.default)(),
        (0, metascraper_url_1.default)(),
        (0, metascraper_title_1.default)(),
        (0, metascraper_author_1.default)(),
        (0, metascraper_publisher_1.default)(),
        (0, metascraper_date_1.default)(),
    ]);
    function getDoi(document) {
        const DOI_REGEX = /10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
        let doi = null;
        const doiNode = document.querySelector('meta[name="citation_doi"]');
        doi = doiNode?.content;
        if (typeof doi !== 'undefined') {
            return doi;
        }
        const citationNode = document.querySelector('meta[name="citation_pdf_url"]');
        doi = citationNode?.content;
        if (typeof doi !== 'undefined' && doi.match(DOI_REGEX)) {
            return doi.match(DOI_REGEX)[0];
        }
        // for semantic scholor
        const doiLinkNode = document.querySelector('a.doi__link');
        doi = doiLinkNode?.text;
        if (typeof doi !== 'undefined' && doi.match(DOI_REGEX)) {
            return doi.match(DOI_REGEX)[0];
        }
        return null;
    }
    scrap({ url: location.href, html: document.documentElement.innerHTML }).then(paper => {
        const url = location.href;
        const tab = '        ';
        let text = '';
        if (window.getSelection().toString() !== '') {
            text = window
                .getSelection()
                .toString()
                .trim()
                .split('\n\n')
                .map(s => tab + s)
                .join('\n');
        }
        const title = paper.title;
        const auths = paper.author;
        const pub = paper.publisher;
        const date = paper.date;
        const doi = getDoi(document);
        const doiTemplate = doi ? `\ndoi:: ${doi}\nn:: ` : '';
        const templ = `${title}
[link](${url})${doiTemplate}
auth:: ${auths}
pub:: ${pub}
date:: ${date}
tags:: #[[reading inbox]]
summary
${tab}This is 2-3 full sentences explaing this document.
Literature Notes
Quotes
${text}`;
        prompt('Press CTRL+C or CMD+C, then escape and paste into Roam.', templ);
    });
})();
//# sourceMappingURL=client.js.map