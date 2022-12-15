import {
    Button,
    ESystemIconNames,
    Link,
    SystemIcon,
    TypographyScale,
} from '@mdb/flora';

import styles from './styles';

interface EventWidgetProps {
    startTime: Date;
    endTime: Date;
    location?: string;
    virtualLink?: string;
    virtualLinkText?: string;
}

export default function EventWidget({
    startTime,
    endTime,
    location = '',
    virtualLink = '',
    virtualLinkText = 'Virtual Link',
}: EventWidgetProps) {
    return (
        <>
            <div sx={styles.widget}>
                <div sx={styles.header}>
                    <SystemIcon name={ESystemIconNames.CALENDAR} />
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
                        <Link href={virtualLink} sx={styles.content}>
                            {virtualLinkText}
                        </Link>
                    )}
                </div>
            )}
            <Button sx={styles.button}>Register Now</Button>
        </>
    );
}
