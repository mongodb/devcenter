import { EThirdPartyLogoVariant } from '@mdb/flora';
import { TagType } from '../types/tag-type';

export const topicToLogo = (
    category: TagType,
    key: string
): EThirdPartyLogoVariant | string => {
    switch (category) {
        case 'Technology':
            return technologyToLogo[key];
        case 'ProgrammingLanguage':
            return languageToLogo[key];
        case 'L1Product':
            return productToLogo[key];
        default:
            break;
    }

    return '';
};

export const languageToLogo: { [key: string]: EThirdPartyLogoVariant } = {
    BASH: EThirdPartyLogoVariant.BASH,
    Bash: EThirdPartyLogoVariant.BASH,
    C: EThirdPartyLogoVariant.C,
    'C++': EThirdPartyLogoVariant.C_PLUS_PLUS,
    'C#': EThirdPartyLogoVariant.C_SHARP,
    CSharp: EThirdPartyLogoVariant.C_SHARP,
    Dart: EThirdPartyLogoVariant.DART,
    Go: EThirdPartyLogoVariant.GO,
    Java: EThirdPartyLogoVariant.JAVA_LOGOMARK,
    JavaScript: EThirdPartyLogoVariant.JAVASCRIPT,
    Kotlin: EThirdPartyLogoVariant.KOTLIN,
    PHP: EThirdPartyLogoVariant.PHP,
    Python: EThirdPartyLogoVariant.PYTHON_LOGOMARK,
    Ruby: EThirdPartyLogoVariant.RUBY_LOGOMARK,
    Rust: EThirdPartyLogoVariant.RUST,
    Scala: EThirdPartyLogoVariant.SCALA,
    Swift: EThirdPartyLogoVariant.SWIFT,
    TypeScript: EThirdPartyLogoVariant.TYPESCRIPT,
    Typescript: EThirdPartyLogoVariant.TYPESCRIPT,
    Kafka: EThirdPartyLogoVariant.KAFKA,
};

export const technologyToLogo: { [key: string]: EThirdPartyLogoVariant } = {
    // Missing: Docker, FastAPI, Kubernetes, Heroku, NextJS, NodeJS, Unity
    Android: EThirdPartyLogoVariant.ANDROID,
    AWS: EThirdPartyLogoVariant.AWS,
    Azure: EThirdPartyLogoVariant.AZURE,
    Cloudflare: EThirdPartyLogoVariant.CLOUDFLARE,
    Django: EThirdPartyLogoVariant.DJANGO,
    Docker: EThirdPartyLogoVariant.DOCKER,
    '.Net Framework': EThirdPartyLogoVariant.DOTNET, // Incorrect
    '.NET': EThirdPartyLogoVariant.DOTNET,
    Excel: EThirdPartyLogoVariant.EXCEL,
    FastAPI: EThirdPartyLogoVariant.FASTAPI,
    FastApi: EThirdPartyLogoVariant.FASTAPI, // Incorrect
    Flask: EThirdPartyLogoVariant.FLASK,
    Flutter: EThirdPartyLogoVariant.FLUTTER,
    GCP: EThirdPartyLogoVariant.GOOGLE_CLOUD_LOGOMARK,
    'GitHub Actions': EThirdPartyLogoVariant.GITHUB_ACTIONS,
    'Github Actions': EThirdPartyLogoVariant.GITHUB_ACTIONS, // Incorrect
    GraphQL: EThirdPartyLogoVariant.GRAPHQL,
    iOS: EThirdPartyLogoVariant.IOS,
    'Jetpack Compose': EThirdPartyLogoVariant.JETPACK_COMPOSE,
    Kafka: EThirdPartyLogoVariant.KAFKA,
    Kubernetes: EThirdPartyLogoVariant.KUBERNETES,
    Netlify: EThirdPartyLogoVariant.NETLIFY,
    Nextjs: EThirdPartyLogoVariant.NEXTJS, // Incorrect
    'Next.js': EThirdPartyLogoVariant.NEXTJS,
    Nodejs: EThirdPartyLogoVariant.NODEJS, // Incorrect
    'Node.js': EThirdPartyLogoVariant.NODEJS,
    Pandas: EThirdPartyLogoVariant.PANDAS,
    Parquet: EThirdPartyLogoVariant.PARQUET,
    'Postman API': EThirdPartyLogoVariant.POSTMAN,
    Prisma: EThirdPartyLogoVariant.PRISMA,
    RaspberryPi: EThirdPartyLogoVariant.RASPBERRY_PI, // Incorrect
    'Raspberry Pi': EThirdPartyLogoVariant.RASPBERRY_PI,
    React: EThirdPartyLogoVariant.REACT,
    'React Native': EThirdPartyLogoVariant.REACT,
    SQL: EThirdPartyLogoVariant.SQL,
    Spark: EThirdPartyLogoVariant.SPARK,
    Spring: EThirdPartyLogoVariant.SPRING,
    Svelte: EThirdPartyLogoVariant.SVELTE,
    Terraform: EThirdPartyLogoVariant.TERRAFORM,
    TLS: EThirdPartyLogoVariant.TLS,
    Unity: EThirdPartyLogoVariant.UNITY,
    Vercel: EThirdPartyLogoVariant.VERCEL,
    'VS Code': EThirdPartyLogoVariant.VS_CODE,
    Xamarin: EThirdPartyLogoVariant.XAMARIN,
};

export const productToLogo: { [key: string]: string } = {
    Atlas: 'atlas_product_family',
    MongoDB: 'mdb_database',
    Realm: 'realm_product_family',
    'Realm (Mobile)': 'realm_product_family',
    Compass: 'mdb_compass',
    'Cloud Manager': 'atlas_cloud_manager',
    'Ops Manager': 'mdb_ops_manager',
    SQL: 'connectors_sql_connector',
    'Multi-Cloud': 'cloud_multicloud',
    'Data API': 'atlas_dataapi',
    Monitoring: 'general_features_realtime',
    'Online Archive': 'atlas_online_archive',
    Search: 'atlas_full_text_search',
    Charts: 'atlas_charts',
    Triggers: 'atlas_triggers',
    'Data Lake': 'atlas_data_lake',
    'Data Federation': 'atlas_data_federation',
    API: 'general_features_api',
    'Data Modeling': 'mdb_document_model',
    'Change Streams': 'mdb_change_streams',
    'Aggregation Framework': 'mdb_aggregation_pipelines',
    CRUD: 'mdb_document_model',
    Transactions: 'general_features_transactions',
    'Time series': 'mdb_time_series',
    Security: 'general_security',
    'Data Visualization': 'mdb_schema_visualization',
    Shell: 'mdb_shell',
    SDK: 'realm_sdk',
    'Realm Sync': 'realm_sync',
    Migrator: 'mdb_migrator',
    Connectors: 'connectors',
    'Kafka Connector': 'connectors_kafka_connector',
    'BI Connector': 'connectors_bi_connector',
    CLI: 'atlas_cli',
    Sync: 'atlas_asymmetric_sync',
    Encryption: 'general_security_encryption',
    Sharding: 'mdb_sharding',
    Schema: 'mdb_schema_visualization',
    Indexes: 'mdb_wildcard_index',
    Studio: 'realm_mobile',
};
