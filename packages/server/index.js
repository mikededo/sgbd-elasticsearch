import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

console.log(client);
