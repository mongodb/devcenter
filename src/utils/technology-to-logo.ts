import { EThirdPartyLogoVariant } from '@mdb/flora';

export const technologyToLogo: { [key: string]: EThirdPartyLogoVariant } = {
    // Missing: Docker, FastAPI, Kubernetes, Heroku, NextJS, NodeJS, Unity
    AWS: EThirdPartyLogoVariant.AWS,
    Azure: EThirdPartyLogoVariant.AZURE,
    GCP: EThirdPartyLogoVariant.GOOGLE_CLOUD_LOGOMARK,
};
