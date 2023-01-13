import {
    Button,
    ESystemIconNames,
    Link,
    SystemIcon,
    TypographyScale,
} from '@mdb/flora';
import { ThemeUICSSObject } from 'theme-ui';

import styles from './styles';

interface EventWidgetProps {
    dates: string | [string, string];
    location?: string;
    virtualLink?: string;
    virtualLinkText?: string;
    registrationLink?: string;
    buttonStyles?: ThemeUICSSObject;
    wrapperStyles?: ThemeUICSSObject;
}

export default function EventWidget({
    dates,
    location = '',
    virtualLink = '',
    buttonStyles = {},
    wrapperStyles = {},
    registrationLink = '',
    virtualLinkText = 'Virtual Link',
}: EventWidgetProps) {
    const startTime = dates[0] ? new Date(dates[0]).toLocaleString() : '';
    const endTime = dates[1] ? `- ${new Date(dates[1]).toLocaleString()}` : '';

    return (
        <div sx={{ ...wrapperStyles }}>
            <div sx={styles.widget}>
                <div sx={styles.header}>
                    <SystemIcon name={ESystemIconNames.CALENDAR} />
                    <TypographyScale sx={styles.title} variant="heading6">
                        When
                    </TypographyScale>
                </div>
                <TypographyScale variant="body3" sx={styles.content}>
                    {startTime} {endTime}
                </TypographyScale>
            </div>
            {(location || virtualLink) && (
                <div sx={styles.widget}>
                    <div sx={styles.header}>
                        <SystemIcon name={ESystemIconNames.LOCATION} />
                        <TypographyScale sx={styles.title} variant="heading6">
                            Location
                        </TypographyScale>
                    </div>
                    {location && (
                        <TypographyScale variant="body3" sx={styles.content}>
                            {location}
                        </TypographyScale>
                    )}
                    {virtualLink && (
                        <Link
                            href={virtualLink}
                            target="_blank"
                            sx={styles.content}
                        >
                            {virtualLinkText}
                        </Link>
                    )}
                </div>
            )}
            {registrationLink && (
                <Button
                    href={registrationLink}
                    target="_blank"
                    customWrapperStyles={{ ...buttonStyles }}
                    sx={styles.button}
                >
                    Register Now
                </Button>
            )}
        </div>
    );
}
