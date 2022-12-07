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
    startTime: Date;
    endTime: Date;
    location?: string;
    virtualLink?: string;
    virtualLinkText?: string;
    registrationLink?: string;
    buttonStyles?: ThemeUICSSObject;
    wrapperStyles?: ThemeUICSSObject;
}

export default function EventWidget({
    startTime,
    endTime,
    location = '',
    virtualLink = '',
    buttonStyles = {},
    wrapperStyles = {},
    registrationLink = '',
    virtualLinkText = 'Virtual Link',
}: EventWidgetProps) {
    return (
        <div sx={{ ...wrapperStyles }}>
            <div sx={styles.widget}>
                <div sx={styles.header}>
                    {/* TODO: placeholder icon should be updated when https://jira.mongodb.org/browse/WEBSITE-13740 is ready from Flora */}
                    <SystemIcon name={ESystemIconNames.APP_WINDOW} />
                    <TypographyScale sx={styles.title} variant="heading6">
                        When
                    </TypographyScale>
                </div>
                <TypographyScale
                    variant="body3"
                    sx={styles.content}
                >{`${startTime.toLocaleString()} - ${endTime.toLocaleString()}`}</TypographyScale>
            </div>
            {(location || virtualLink) && (
                <div sx={styles.widget}>
                    <div sx={styles.header}>
                        {/* TODO: placeholder icon should be updated when https://jira.mongodb.org/browse/WEBSITE-13740 is ready from Flora */}
                        <SystemIcon name={ESystemIconNames.HEART} />
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
                        <Link href={virtualLink} sx={styles.content}>
                            {virtualLinkText}
                        </Link>
                    )}
                </div>
            )}
            {registrationLink && (
                <Button
                    href={registrationLink}
                    customWrapperStyles={{ ...buttonStyles }}
                    sx={styles.button}
                >
                    Register Now
                </Button>
            )}
        </div>
    );
}
