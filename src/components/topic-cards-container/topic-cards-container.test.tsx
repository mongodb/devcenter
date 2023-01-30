import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EThirdPartyLogoVariant, ThirdPartyLogo } from '@mdb/flora';
import { TopicCardsContainer } from '.';
import { TopicCardProps } from '@mdb/devcenter-components';

const PRODUCT_NAME = 'Atlas';
const icon = <ThirdPartyLogo variant={EThirdPartyLogoVariant.DOCKER} />;

const TOPICS: TopicCardProps[] = [
    {
        title: 'Aggregation',
        href: '#',
        icon,
    },
    {
        title: 'Atlas Search',
        href: '#',
        icon,
    },
    {
        title: 'Charts',
        href: '#',
        icon,
    },
    {
        title: 'Other Topic Here',
        href: '#',
        icon,
    },
];

test('renders topic cards with title', async () => {
    render(<TopicCardsContainer topics={TOPICS} title={PRODUCT_NAME} />);
    TOPICS.forEach(({ title }) => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });
});
