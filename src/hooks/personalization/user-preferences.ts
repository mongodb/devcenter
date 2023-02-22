import { useCallback } from 'react';
import { submitPersonalizationSelections } from '../../components/modal/personalization/utils';
import { Tag } from '../../interfaces/tag';

interface UserPreferences {
    followedTags: Array<Tag>;
    emailPreference: boolean;
}

interface UserPreferencesHook {
    updateUserPreferences: (prefs: UserPreferences) => Promise<void>;
}
const useUserPreferences = (): UserPreferencesHook => {
    // Can use use context here for notification
    const updateUserPreferences = useCallback(
        async ({ followedTags, emailPreference }: UserPreferences) => {
            try {
                await submitPersonalizationSelections({
                    followedTags,
                    emailPreference,
                });
            } catch {
                alert('Unable to update user prefs.');
                return;
            }
            alert('Successfully updated user pref');
        },
        []
    );

    return {
        updateUserPreferences,
    };
};

export default useUserPreferences;
