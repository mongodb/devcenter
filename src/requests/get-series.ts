import { ContentSeries } from '../interfaces/content-piece';

const getSeries = (slug: string): ContentSeries | null =>
    slug.includes('atlas/a')
        ? {
              title: 'Cool Atlas Stuff',
              content: [
                  {
                      authors: ['Farah Appleseed'],
                      image: {
                          alt: 'thumbnail',
                          url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                      },
                      title: 'This is 101 article',
                      description: 'This is my first article',
                      contentDate: new Date().toDateString(),
                      tags: {
                          l1Product: 'Atlas',
                          l2Product: [],
                          technology: [],
                          programmingLanguage: [],
                          authorType: 'MongoDB',
                          contentType: 'Article',
                      },
                      slug: 'product/atlas/a1',
                  },
                  {
                      authors: ['Farah Appleseed'],
                      image: {
                          alt: 'thumbnail',
                          url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                      },
                      title: 'This is 102 article',
                      description: 'This is my second article',
                      contentDate: new Date().toDateString(),
                      tags: {
                          l1Product: 'Atlas',
                          l2Product: [],
                          technology: [],
                          programmingLanguage: [],
                          authorType: 'MongoDB',
                          contentType: 'Article',
                      },
                      slug: 'product/atlas/a2',
                  },
                  {
                      authors: ['Farah Appleseed'],
                      image: {
                          alt: 'thumbnail',
                          url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                      },
                      title: 'This is 103 article',
                      description: 'This is my third article',
                      contentDate: new Date().toDateString(),
                      tags: {
                          l1Product: 'Atlas',
                          l2Product: [],
                          technology: [],
                          programmingLanguage: [],
                          authorType: 'MongoDB',
                          contentType: 'Article',
                      },
                      slug: 'product/atlas/a3',
                  },
                  {
                      authors: ['Farah Appleseed'],
                      image: {
                          alt: 'thumbnail',
                          url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
                      },
                      title: 'This is 104 article',
                      description: 'This is my fourth article',
                      contentDate: new Date().toDateString(),
                      tags: {
                          l1Product: 'Atlas',
                          l2Product: [],
                          technology: [],
                          programmingLanguage: [],
                          authorType: 'MongoDB',
                          contentType: 'Article',
                      },
                      slug: 'product/atlas/a4',
                  },
              ],
          }
        : null;
export default getSeries;
