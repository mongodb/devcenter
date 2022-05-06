import { EThirdPartyLogoVariant } from '@mdb/flora';

export const languageToLogo: { [key: string]: EThirdPartyLogoVariant } = {
    // Missing: Dart, Kotlin, Rust, Swift, TypeScript
    C: EThirdPartyLogoVariant.C,
    'C++': EThirdPartyLogoVariant.C_PLUS_PLUS,
    'C#': EThirdPartyLogoVariant.C_SHARP,
    Go: EThirdPartyLogoVariant.GO,
    Java: EThirdPartyLogoVariant.JAVA,
    JavaScript: EThirdPartyLogoVariant.JAVASCRIPT,
    PHP: EThirdPartyLogoVariant.PHP,
    Python: EThirdPartyLogoVariant.PYTHON,
    Ruby: EThirdPartyLogoVariant.RUBY,
    Scala: EThirdPartyLogoVariant.SCALA,
};
