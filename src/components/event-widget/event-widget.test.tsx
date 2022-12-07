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
                startTime={new Date('2022-11-30T17:00:00.000Z')}
                endTime={new Date('2022-12-01T17:00:00.000Z')}
                location={location}
                virtualLink={virtualLink}
                virtualLinkText={virtualLinkText}
                registrationLink={registrationLink}
            />
        );

        // formats provided dates
        expect(
            screen.getByText('11/30/2022, 12:00:00 PM - 12/1/2022, 12:00:00 PM')
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
                startTime={new Date('2022-11-30T17:00:00.000Z')}
                endTime={new Date('2022-12-01T17:00:00.000Z')}
                location={location}
                virtualLink={virtualLink}
                virtualLinkText={virtualLinkText}
                registrationLink={registrationLink}
                wrapperStyles={{ color: 'red' }}
                buttonStyles={{ marginTop: '12px' }}
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
                startTime={new Date('2022-11-30T17:00:00.000Z')}
                endTime={new Date('2022-12-01T17:00:00.000Z')}
                virtualLink={virtualLink}
            />
        );

        expect(screen.getByText('Virtual Link')).toBeInTheDocument();
    });
});
