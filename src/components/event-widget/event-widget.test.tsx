import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import EventWidget from '.';

describe('[Component]: Event Widget', () => {
    const location = '1633 Broadway 38th floor, New York, NY 10019';
    const virtualLink = 'www.loremipsum.com/my-event';
    const virtualLinkText = 'Super Chill Virtual Event';

    it('renders', () => {
        const { container } = render(
            <EventWidget
                startTime={new Date('2022-11-30T17:00:00.000Z')}
                endTime={new Date('2022-12-01T17:00:00.000Z')}
                location={location}
                virtualLink={virtualLink}
                virtualLinkText={virtualLinkText}
            />
        );

        /*
            Only test for date formatting because of .toLocateString() usage
            Exact match would cause wacky behavior of times when running tests locally vs. during build
        */
        expect(
            screen.getByText('11/30/2022', { exact: false })
        ).toBeInTheDocument();
        expect(
            screen.getByText('12/1/2022', { exact: false })
        ).toBeInTheDocument();

        // sets location
        expect(screen.getByText(location)).toBeInTheDocument();

        // sets link with proper attributes
        const link = container.getElementsByTagName('a')[0];
        expect(link).toHaveAttribute('href', virtualLink);
        expect(screen.getByText(virtualLinkText)).toBeInTheDocument();
    });

    it('sets default props', () => {
        render(
            <EventWidget
                startTime={new Date('2022-11-30T17:00:00.000Z')}
                endTime={new Date('2022-12-01T17:00:00.000Z')}
                virtualLink={virtualLink}
            />
        );

        expect(screen.getByText('Virtual Link')).toBeInTheDocument();
    });
});
