import { Button } from '@mdb/flora';
import { CTA } from './types';
import CTALink from './CTALink';
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
                              return <CTALink {...cta} key={cta.url} />; // TODO: can this be replaced with Flora Link component and we can remove <CTALink /> all together?
                          }
                      })
                    : null}
            </div>
        );
    }
    return null;
};
