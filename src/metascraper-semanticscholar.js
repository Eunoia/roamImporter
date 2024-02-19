import { $filter, author, date, title, memoizeOne, parseUrl, toRule, publisher } from '@metascraper/helpers';

const toAuthor = toRule(author);
const toDate = toRule(date);
const toPublisher = toRule(publisher);
const toTitle = toRule(title);

const test = memoizeOne(url => parseUrl(url).domainWithoutSuffix === 'semanticscholar');

export default () => {
  const rules = {
    title: [toTitle($ => $filter($, $('h1[data-test-id="paper-detail-title"]')))],
    author: [toAuthor($ => $filter($, $('.author-list')))],
    publisher: [toPublisher($ => $filter($, $('[data-heap-id="paper-meta-journal"]'))), toPublisher(() => 'Semantic Scholar')],
    date: [toDate($ => $filter($, $('span[data-test-id="paper-year"]')))],
  };

  rules.test = ({ url }) => test(url);

  return rules;
};
