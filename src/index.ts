import express from 'express';

import metascraper from 'metascraper';
import metascraperDoi from './metascraper-doi';

import got from 'got';

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/foo', async (_req, res) => {
  const targetUrl = 'https://pubmed.ncbi.nlm.nih.gov/26646555/';

  const { body: html, url } = await got(targetUrl);
  const scrap = metascraper([metascraperDoi()]);
  const metadata = await scrap({ url, html });


  //   const metadata = await Metascraper({ html, url });
  console.log(metadata);

  res.send(metadata);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
