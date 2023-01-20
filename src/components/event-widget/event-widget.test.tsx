import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import EventWidget from '.';

describe('[Component]: Event Widget', () => {
    const location = '1633 Broadway 38th floor, New York, NY 10019';
    const virtualLink = 'www.loremipsum.com/my-event';
    const virtualLinkText = 'Super Chill Virtual Event';
    const registrationLink = 'www.dolorsit.amet/your-event';

    it('renders', () => {
        const { container } = render(
            <EventWidget
                location={location}
                virtualLink={virtualLink}
                virtualLinkText={virtualLinkText}
                registrationLink={registrationLink}
                dates={['2022-11-30T17:00:00.000Z', '2022-12-01T17:00:00.000Z']}
            />
        );

        /*
            Only test for date formatting because of .toLocaleString() usage
            Exact match would cause wacky behavior of times when running tests locally vs. during build
        */
        expect(
            screen.getByText('November 30, 2022', { exact: false })
        ).toBeInTheDocument();
        expect(
            screen.getByText('December 1, 2022', { exact: false })
        ).toBeInTheDocument();

        // sets location
        expect(screen.getByText(location)).toBeInTheDocument();

        // sets link(s) with proper attributes
        const virtualMeetupLink = container.getElementsByTagName('a')[0];
        expect(virtualMeetupLink).toHaveAttribute('href', virtualLink);
        expect(screen.getByText(virtualLinkText)).toBeInTheDocument();

        const registrationButton = container.getElementsByTagName('a')[1];
        expect(registrationButton).toHaveAttribute('href', registrationLink);
    });

    it('sets styles passed from props', () => {
        const { container } = render(
            <EventWidget
                location={location}
                virtualLink={virtualLink}
                virtualLinkText={virtualLinkText}
                registrationLink={registrationLink}
                wrapperStyles={{ color: 'red' }}
                buttonStyles={{ marginTop: '12px' }}
                dates={['2022-11-30T17:00:00.000Z', '2022-12-01T17:00:00.000Z']}
            />
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveStyle('color: red');

        const btn = container.getElementsByTagName('a')[1].parentElement; // the styles get placed on the wrapper element because its a Flora component
        expect(btn).toHaveStyle('margin-top: 12px');
    });

    it('sets default props', () => {
        render(
            <EventWidget
                dates={['2022-11-30T17:00:00.000Z', '2022-12-01T17:00:00.000Z']}
                virtualLink={virtualLink}
            />
        );

        expect(screen.getByText('Virtual Link')).toBeInTheDocument();
    });
});
