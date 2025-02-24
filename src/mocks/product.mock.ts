import type { InferredProduct } from '~/lib/types';

export const product = {
  packageInfo: {
    z: 1,
    x: 1,
    weight: 1,
    y: 1,
  },
  windSpeed: 'közepestől az élénk szélig',
  _updatedAt: '2024-10-02T14:16:31Z',
  _id: '9888fb88-9aa5-4ea5-a599-591d19d41fa4',
  size: '42x45cm / 2.5 m farokkal',
  name: 'Ördögfióka',
  materials: ['bambusz', 'papír'],
  _rev: '3VNnBlcG4WkrCKieQAuUqK',
  _type: 'kite',
  _createdAt: '2024-04-05T08:40:08Z',
  isBeginner: true,
  description:
    'Hagyományos forma, hagyományos anyagokból. Érzékeny, de látványos.Nem a levegőben, hanem a földön kell rá vigyázni. A víz és a bozót az ellensége.',
  image: {
    asset: {
      url: 'https://cdn.sanity.io/images/s2hk1b39/develop/a659f9fef018cf839676e3c961eaea12d57205b4-800x600.webp',
      metadata: {
        hasAlpha: false,
        lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwYH/8QAIBAAAQQCAgMBAAAAAAAAAAAAAwABAgQFESExEiIyUf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGREAAgMBAAAAAAAAAAAAAAAAAAMBERMC/9oADAMBAAIRAxEAPwDt9DCBjy7csp4rCSa7cPM5CiJPUBv1Bm/FqqtYeulZXDEJZwjFvF/ZlSx9ySKVNC+OKFr5QnKEe3QuMH//2Q==',
        dimensions: {
          _type: 'sanity.imageDimensions',
          width: 800,
          aspectRatio: 1.3333333333333333,
          height: 600,
        },
        isOpaque: true,
        blurHash: 'V6Pj+906PX9z0000MK%2Vsn300-MK4NEs+IoI.V{xZso',
        _type: 'sanity.imageMetadata',
        palette: {
          darkVibrant: {
            _type: 'sanity.imagePaletteSwatch',
            foreground: '#fff',
            title: '#fff',
            population: 0,
            background: '#6a1a1c',
          },
          lightMuted: {
            population: 0.03,
            background: '#afd5d4',
            _type: 'sanity.imagePaletteSwatch',
            foreground: '#000',
            title: '#000',
          },
          vibrant: {
            title: '#fff',
            population: 0.33,
            background: '#922427',
            _type: 'sanity.imagePaletteSwatch',
            foreground: '#fff',
          },
          dominant: {
            background: '#cce2fb',
            _type: 'sanity.imagePaletteSwatch',
            foreground: '#000',
            title: '#000',
            population: 5.35,
          },
          _type: 'sanity.imagePalette',
          darkMuted: {
            foreground: '#fff',
            title: '#fff',
            population: 1.29,
            background: '#2a2e2c',
            _type: 'sanity.imagePaletteSwatch',
          },
          muted: {
            foreground: '#fff',
            title: '#fff',
            population: 0.09,
            background: '#969b6b',
            _type: 'sanity.imagePaletteSwatch',
          },
          lightVibrant: {
            background: '#cce2fb',
            _type: 'sanity.imagePaletteSwatch',
            foreground: '#000',
            title: '#000',
            population: 5.35,
          },
        },
      },
    },
  },
  price: 1500,
  slug: {
    current: 'ordogfioka',
    _type: 'slug',
  },
} satisfies InferredProduct;
