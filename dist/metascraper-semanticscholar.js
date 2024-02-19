"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@metascraper/helpers");
const toAuthor = (0, helpers_1.toRule)(helpers_1.author);
const toDate = (0, helpers_1.toRule)(helpers_1.date);
const toPublisher = (0, helpers_1.toRule)(helpers_1.publisher);
const toTitle = (0, helpers_1.toRule)(helpers_1.title);
const test = (0, helpers_1.memoizeOne)(url => (0, helpers_1.parseUrl)(url).domainWithoutSuffix === 'semanticscholar');
exports.default = () => {
    const rules = {
        title: [toTitle($ => (0, helpers_1.$filter)($, $('h1[data-test-id="paper-detail-title"]')))],
        author: [toAuthor($ => (0, helpers_1.$filter)($, $('.author-list')))],
        publisher: [toPublisher($ => (0, helpers_1.$filter)($, $('[data-heap-id="paper-meta-journal"]'))), toPublisher(() => 'Semantic Scholar')],
        date: [toDate($ => (0, helpers_1.$filter)($, $('span[data-test-id="paper-year"]')))],
    };
    rules.test = ({ url }) => test(url);
    return rules;
};
//# sourceMappingURL=metascraper-semanticscholar.js.map