"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metascraper_1 = __importDefault(require("metascraper"));
const metascraper_doi_1 = __importDefault(require("./metascraper-doi"));
const got_1 = __importDefault(require("got"));
const app = express_1.default();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/foo', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const targetUrl = 'https://pubmed.ncbi.nlm.nih.gov/26646555/';
    const { body: html, url } = yield got_1.default(targetUrl);
    const scrap = metascraper_1.default([metascraper_doi_1.default()]);
    const metadata = yield scrap({ url, html });
    //   const metadata = await Metascraper({ html, url });
    console.log(metadata);
    res.send(metadata);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map