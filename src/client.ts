import metascraper from 'metascraper';
import metascraperURL from 'metascraper-url';
import metascraperTitle from 'metascraper-title';
import metascraperAuthor from 'metascraper-author';
import metascraperPublisher from 'metascraper-publisher';
import metascraperDate from 'metascraper-date';
import metascraperSemanticscholar from './metascraper-semanticscholar.js';
import metascraperDoi from './metascraper-doi.js';

(() => {
  const scrap = metascraper([
    metascraperDoi(),
    metascraperSemanticscholar(),
    metascraperURL(),
    metascraperTitle(),
    metascraperAuthor(),
    metascraperPublisher(),
    metascraperDate(),
  ]);

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
    const doi = paper.doi;
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
