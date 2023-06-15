import { Button, Link } from '@mdb/flora';
import { CTA } from './types';
import { CTAContainerStyles } from './styles';

export const createTopicPageCTAS = (ctas: CTA[]) => {
    if (ctas.length > 0) {
        return (
            <div sx={CTAContainerStyles}>
                {ctas.length < 3
                    ? ctas.map((cta, i) => {
                          // Max of 2 buttons, so only bother with the first 2.
                          if (i === 0) {
                              return (
                                  <Button
                                      key={cta.text}
                                      href={cta.url}
                                      variant="secondary"
                                      size="large"
                                      target="_blank" // Flora doesn't add rel="noopener", so maybe we can contribute that.
                                  >
                                      {cta.text}
                                  </Button>
                              );
                          }
                          if (i === 1) {
                              return (
                                  <Link
                                      href={cta.url}
                                      key={cta.text}
                                      linkIcon="arrow"
                                      target="_blank"
                                  >
                                      {cta.text}
                                  </Link>
                              );
                          }
                      })
                    : null}
            </div>
        );
    }
    return null;
};
