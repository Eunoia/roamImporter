import metascraper from 'metascraper';
import metascraperURL from 'metascraper-url';
import metascraperTitle from 'metascraper-title';
import metascraperAuthor from 'metascraper-author';
import metascraperPublisher from 'metascraper-publisher';
import metascraperDate from 'metascraper-date';
import metascraperSemanticscholar from './metascraper-semanticscholar.js';

(() => {
  const scrap = metascraper([
    metascraperSemanticscholar(),
    metascraperURL(),
    metascraperTitle(),
    metascraperAuthor(),
    metascraperPublisher(),
    metascraperDate(),
  ]);
  function getDoi(document: Document) {
    const DOI_REGEX = /10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    let doi: string | null = null;
    const doiNode = document.querySelector<HTMLMetaElement | null>('meta[name="citation_doi"]');
    doi = doiNode?.content;
    if (typeof doi !== 'undefined') {
      return doi;
    }
    const citationNode = document.querySelector('meta[name="citation_pdf_url"]') as HTMLMetaElement;
    doi = citationNode?.content;
    if (typeof doi !== 'undefined' && doi.match(DOI_REGEX)) {
      return doi.match(DOI_REGEX)[0];
    }
    // for semantic scholor
    const doiLinkNode = document.querySelector<HTMLAnchorElement>('a.doi__link');
    doi = doiLinkNode?.text;
    if (typeof doi !== 'undefined' && doi.match(DOI_REGEX)) {
      return doi.match(DOI_REGEX)[0];
    }
    return null;
  }
  scrap({ url: location.href, html: document.documentElement.innerHTML }).then(paper => {
    const url = location.href;
    const tab = '        ';
    let text: string = '';
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
