//@ts-nocheck
import { getPayload } from 'payload';
import config from '../src/payload.config';
import { flattenContent } from '../src/search/flatten';
import { randomUUID } from 'crypto';

// ✅ chunk helper
const chunkText = (text: string, size = 10000) => {
  const chunks = [];

  for (let i = 0; i < text.length; i += size) {
    const chunk = text.slice(i, i + size).trim();

    if (chunk.length > 0) {
      chunks.push({
        id: randomUUID(),   // ✅ generate here
        text: chunk,
      });
    }
  }

  return chunks;
};

const collections = [
  'all-pages',
  'cards',
  'news',
];

const locales = ['en', 'ar'];

const run = async () => {
  const payload = await getPayload({ config });

  for (const locale of locales) {
    console.log(`\n--- Indexing locale: ${locale} ---`);

    for (const collection of collections) {
      console.log(`Updating ${collection} (${locale})...`);

      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const res = await payload.find({
          collection,
          locale,
          limit: 50,
          page,
        });

        for (const doc of res.docs) {
          let searchableContent: Record<string, unknown>;

          if (collection === 'cards') {
            searchableContent = {
              title: doc.title,
              shortDescription: doc.shortDescription,
            };
          } else if (collection === 'news') {
            searchableContent = {
              title: doc.title,
              date: doc.date,
              shortDescription: doc.shortDescription,
            };
          } else {
            searchableContent = {
              title: doc.title,
              layout: doc.layout,
            };
          }

          // ✅ flatten everything
          const fullText = flattenContent(searchableContent).toLowerCase();

          const searchIndex = chunkText(fullText);

          try {
            await payload.update({
              collection,
              locale,
              id: doc.id,
              data: { searchIndex },
              overrideAccess: true,
            });
            console.log(`Updated ${collection} → ${doc.id} (${locale})`);
          } catch (updateErr: any) {
            console.warn(`Skipped ${collection} → ${doc.id}: ${updateErr?.message}`);
          }
        }

        hasNextPage = res.hasNextPage;
        page++;
      }
    }
  }

  console.log('✅ DONE');
  process.exit(0);
};

run();