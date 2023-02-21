import { useMemo, useEffect } from 'react';
import { ThemeUICSSObject } from 'theme-ui';
import { ESystemIconNames, SystemIcon, TypographyScale } from '@mdb/flora';

import { NOTIFICATION } from '../../types/notification-type';
import { useNotificationContext } from '../../contexts/notification';

import styles from './styles';

interface NotificationProps {
    message: string;
    variant: NOTIFICATION;
    customStyles?: ThemeUICSSObject;
    autoDismiss?: boolean;
    dismissCb?: () => void;
}

type VariantStyles = {
    info: ThemeUICSSObject;
    warn: ThemeUICSSObject;
    success: ThemeUICSSObject;
    error: ThemeUICSSObject;
};

const DISPLAY_NOTIFICATION_MS = 2000;

export function Notification({
    message,
    variant,
    customStyles,
    autoDismiss = false,
    dismissCb = () => null,
}: NotificationProps) {
    const icon = useMemo(() => {
        let type = ESystemIconNames.CIRCLE_ALERT;

        if (variant === 'SUCCESS') {
            type = ESystemIconNames.CIRCLE_CHECK;
        } else if (variant === 'INFO') {
            type = ESystemIconNames.CIRCLE_INFO;
        }

        return type;
    }, [variant]);

    useEffect(() => {
        if (autoDismiss) {
            const timer = setTimeout(dismissCb, DISPLAY_NOTIFICATION_MS);
            return () => clearTimeout(timer);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            sx={{
                ...styles.notification,
                ...styles[variant.toLowerCase() as keyof VariantStyles],
                ...customStyles,
            }}
        >
            <SystemIcon size="medium" sx={styles.icon} name={icon} />
            <TypographyScale variant="body3">{message}</TypographyScale>
        </div>
    );
}

export function NotificationsContainer() {
    const { notifications, clearNotification } = useNotificationContext();

    return (
        <div sx={styles.container}>
            {notifications.map(({ id, message, variant }) => (
                <Notification
                    key={id}
                    autoDismiss
                    message={message}
                    variant={variant}
                    dismissCb={() => clearNotification(id)}
                />
            ))}
        </div>
    );
}
