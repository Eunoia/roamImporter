import { $filter, toRule } from '@metascraper/helpers';

const doi = (value, opts) => {
  const DOI_REGEX = /10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
}
const toDoi = toRule(doi);

export default () => {
  
  const rules = {
    doi: [
      toDoi($ => $filter($, $('meta[name="citation_doi"]'))),
      toDoi($ => $filter($, $('meta[name="citation_pdf_url"]'))),
      toDoi($ => $filter($, $('a.doi__link')))
    ]
  };

  return rules;
};
