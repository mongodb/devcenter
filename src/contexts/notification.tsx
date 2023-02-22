import { createContext, useContext, useState, ReactNode } from 'react';
import { NOTIFICATION } from '../types/notification-type';

interface AddNotification {
    message: string;
    variant: NOTIFICATION;
}

interface Notification {
    id: number;
    message: string;
    variant: NOTIFICATION;
}

const NotificationsContext = createContext<{
    notifications: Notification[];
    clearNotification: (id: number) => void;
    setNotification: (notification: AddNotification) => void;
}>({
    notifications: [],
    setNotification: () => null,
    clearNotification: () => null,
});

export function NotificationsProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const setNotification = (notification: AddNotification) => {
        setNotifications(prevNotifications => [
            ...prevNotifications,
            {
                id: new Date().getTime(), // generate unique ID
                ...notification,
            },
        ]);
    };

    const clearNotification = (id: number) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(n => n.id !== id)
        );
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                setNotification,
                clearNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
}

export const useNotificationContext = () => useContext(NotificationsContext);
