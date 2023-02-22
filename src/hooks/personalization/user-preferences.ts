import { useCallback } from 'react';
import { submitPersonalizationSelections } from '../../components/modal/personalization/utils';
import { Tag } from '../../interfaces/tag';
import { useNotificationContext } from '../../contexts/notification';

interface UserPreferences {
    followedTags: Array<Tag>;
    emailPreference: boolean;
}

interface UserPreferencesHook {
    updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
}
const useUserPreferences = (): UserPreferencesHook => {
    const { setNotification } = useNotificationContext();

    const updateUserPreferences = useCallback(
        async ({ followedTags, emailPreference }: UserPreferences) => {
            try {
                await submitPersonalizationSelections({
                    followedTags,
                    emailPreference,
                });
            } catch {
                setNotification({
                    message:
                        'Your request could not be completed at this time. Please try again.',
                    variant: 'WARN',
                });
                return;
            }
            setNotification({
                message: 'Successfully saved your preferences',
                variant: 'SUCCESS',
            });
        },
        []
    );

    return {
        updateUserPreferences,
    };
};

export default useUserPreferences;
