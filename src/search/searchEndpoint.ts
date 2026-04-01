//@ts-nocheck
import 'dotenv/config';
import type { Endpoint, PayloadRequest } from 'payload';

const collections = [
  'all-pages',
  'news',
];

export const searchEndpoint: Endpoint = {
  path: '/search',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const s = req.query?.s as string;

    if (!s) {
      return Response.json({ error: 'Missing search query' }, { status: 400 });
    }

    const searchTerm = s;
    const isArabic = /[\u0600-\u06FF]/.test(searchTerm);
    const explicitLocale = req.query?.locale as string | undefined;
    const detectedLocale = explicitLocale || (isArabic ? 'ar' : 'en');

    try {
      const results: any[] = [];

      for (const collection of collections) {
        const needsImage = ['news', 'cards'].includes(collection);

        const data = await req.payload.find({
          collection: collection as any,
          locale: detectedLocale,
          fallbackLocale: false as any,
          limit: 50,
          depth: needsImage ? 1 : 0,
          where: {
            'searchIndex.text': {
              contains: searchTerm,
            },
          },
        });

        for (const doc of data.docs as any[]) {
            const title = doc.title || doc.slug || 'Untitled';

            let score = 1;
            if (title.toLowerCase().includes(searchTerm.toLowerCase())) score += 2;

            if (collection === 'cards') {
              let link: any = null;
              if (doc.linkType === 'internal') {
                link = { type: 'internal', url: doc.internalLink?.value?.fullPath ?? doc.internalLink?.fullPath ?? null };
              } else if (doc.linkType === 'external') {
                link = { type: 'external', url: doc.externalLink ?? null };
              } else if (doc.linkType === 'file') {
                link = { type: 'file', url: doc.fileLink?.url ?? null };
              } else if (doc.linkType === 'mailto') {
                link = { type: 'mailto', url: doc.mailtoLink ? `mailto:${doc.mailtoLink}` : null };
              }

              results.push({
                id: doc.id,
                title,
                collection,
                score,
                locale: detectedLocale,
                image: doc.image?.url ?? null,
                shortDescription: doc.shortDescription ?? null,
                link,
              });
            } else if (collection === 'news') {
              results.push({
                id: doc.id,
                title,
                fullPath: doc.fullPath ?? doc.slug,
                collection,
                score,
                locale: detectedLocale,
                image: doc.image?.url ?? null,
                date: doc.date ?? null,
                shortDescription: doc.shortDescription ?? null,
              });
            } else {
              results.push({
                id: doc.id,
                title,
                slug: doc.slug,
                fullPath: doc.fullPath ?? doc.slug,
                collection,
                score,
                locale: detectedLocale,
              });
            }
          }
      }

      // sort by relevance
      results.sort((a, b) => b.score - a.score);

      return Response.json({
        results,
        total: results.length,
      });
    } catch (err) {
      console.error(err);
      return Response.json({ error: 'Search failed' }, { status: 500 });
    }
  },
};