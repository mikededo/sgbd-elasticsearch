import { Client } from '@elastic/elasticsearch';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const elasticClient = new Client({ node: 'http://localhost:9200' });

const PlayersIndexMapping = {
    index: 'players',
    body: {
        mappings: {
            properties: {
                id: { type: 'keyword' },
                firstName: { type: 'text' },
                lastName: { type: 'text' },
                fullName: { type: 'text' },
                age: { type: 'integer' },
                height: { type: 'double' },
                weight: { type: 'double' },
                country: {
                    type: 'text',
                    fields: { key: { type: 'keyword' } }
                },
                team: {
                    type: 'text',
                    fields: { key: { type: 'keyword' } }
                },
                strongFoot: { type: 'text' },
                firstStrongFoot: { type: 'keyword' },
                secondStrongFoot: { type: 'keyword' },
                thirdStrongFoot: { type: 'keyword' },
                fourthStrongFoot: { type: 'keyword' }
            }
        }
    }
};

/**
 * @param {any[]} result
 * @param {any[]} initial
 * @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html
 */
const clearBulkErrors = (result, initial) => {
    const erroredDocs = [];

    result.forEach(async (action, i) => {
        const op = Object.keys(action)[0];

        if (action[op].error) {
            erroredDocs.push({
                status: action[op].status,
                error: action[op].error,
                operation: initial[i * 2],
                document: initial[i * 2 + 1]
            });
        }

        await writeFile(
            path.join(path.resolve(), 'log.error.json'),
            JSON.stringify(erroredDocs)
        );

        console.log(
            `[ELASTIC] 🔴 ${erroredDocs.length} occured while inserting.`
        );
    });
};

// On elastic client init, check if data has to be inserted
const initialize = async () => {
    try {
        await elasticClient.indices.delete({ index: 'players' });
    } catch (e) {}

    const { body: exists } = await elasticClient.indices.exists({
        index: 'players'
    });

    if (!exists) {
        console.log(
            '[ELASTIC] 🟡 No players index found, initialising'
        );

        console.log('[ELASTIC] ℹ️  Creating elastic players index');
        await elasticClient.indices.create(PlayersIndexMapping);

        try {
            console.log('[ELASTIC] ℹ️  Reading players data');

            let init = new Date();
            const filesContent = await Promise.all(
                [...Array(15)].map((_, i) =>
                    readFile(path.join(path.resolve(), 'data', `${i + 1}.json`))
                )
            );

            console.log('[ELASTIC] \t⏱️  Took: %dms', new Date() - init);

            console.log('[ELASTIC] ℹ️  Parsing players data');

            init = new Date();
            const parsedDocs = filesContent
                .map((buf) => JSON.parse(buf))
                // Flat matrix
                .flat()
                // Flat array
                .flatMap((doc) => [{ index: { _index: 'players' } }, doc]);

            console.log('[ELASTIC] \t⏱️  Took: %dms', new Date() - init);

            // Insert players
            console.log(`[ELASTIC] ℹ️  Read ${parsedDocs.length / 2} players`);
            console.log('[ELASTIC] ℹ️  Inserting players');

            init = new Date();
            const { body: result } = await elasticClient.bulk({
                refresh: true,
                body: parsedDocs
            });

            console.log('[ELASTIC] \t⏱️  Took: %dms', new Date() - init);

            if (result.errors) {
                clearBulkErrors(result.items, parsedDocs);
            } else {
                console.log(
                    `[ELASTIC] 🟢 A total of ${result.items.length} players have been inserted`
                );
            }
        } catch (e) {
            try {
                // Rollback creation of index
                await elasticClient.indices.delete({ index: 'players' });
            } catch (_) {
                console.error(
                    '[ELASTIC] 🔴 Index could not have been removed.'
                );
            }
        }
    } else {
        console.log('[ELASTIC] 🟡  players index found, initialising');

        const { body } = await elasticClient.search({
            index: 'players'
        });
        console.log(
            `[ELASTIC] A total of ${body.hits.total.value} players has been found in the database.`
        );
    }
};

initialize();

export default elasticClient;
