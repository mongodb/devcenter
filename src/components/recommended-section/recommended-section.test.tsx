import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecommendedSection from './recommended-section';
import { MOCK_ARTICLE_TAGS, MOCK_ARTICLE_CONTENT } from '../../mockdata';
import { ReactNode } from 'react';

const mockContent = {
    contentItems: MOCK_ARTICLE_CONTENT,
    followedTags: MOCK_ARTICLE_TAGS,
};

const mockPropsFn = jest.fn();

jest.mock('../../contexts/modal', () => ({
    useModalContext: () => ({
        openModal: (Component: ReactNode) => {
            // @ts-expect-error Component should have props
            mockPropsFn(Component?.props);
            return Component;
        },
    }),
}));

jest.mock('../modal/personalization', () => {
    return jest.fn(() => <></>);
});

describe('Recommended Section', () => {
    test('Renders nothing when not passed tags or content', () => {
        render(<RecommendedSection />);

        expect(screen.queryByRole('div')).not.toBeInTheDocument();
    });

    test('Renders tags when passed tags', () => {
        render(<RecommendedSection tags={MOCK_ARTICLE_TAGS} />);

        expect(
            screen.queryAllByTestId('recommended-topic-tag').length
        ).toBeGreaterThan(0);
    });

    test('Renders content when passed content', () => {
        render(<RecommendedSection content={mockContent} />);

        expect(screen.queryAllByTestId('card-related').length).toBeGreaterThan(
            0
        );
    });

    test('Renders content over tags when passed both', () => {
        render(
            <RecommendedSection
                tags={MOCK_ARTICLE_TAGS}
                content={mockContent}
            />
        );
        expect(screen.queryAllByTestId('recommended-topic-tag').length).toBe(0);
        expect(screen.queryAllByTestId('card-related').length).toBeGreaterThan(
            0
        );
    });

    test('Clicking save button calls onTagsSaved prop', async () => {
        const mockTagsSaved = jest.fn();

        render(
            <RecommendedSection
                tags={MOCK_ARTICLE_TAGS}
                onTagsSaved={mockTagsSaved}
            />
        );

        const firstTag = screen.getAllByTestId('recommended-topic-tag')[0]
            .firstChild as Element;
        const checkbox = screen.getByRole('checkbox', {
            name: /digest-checkbox/i,
        });
        const saveBtn = screen.getByRole('button', { name: /save/i });

        await userEvent.click(firstTag);
        await userEvent.click(checkbox);
        await userEvent.click(saveBtn);

        expect(mockTagsSaved).toBeCalledWith([MOCK_ARTICLE_TAGS[0]], false);
    });

    test('Tags selected reflect existingSelections passed to personalization modal', async () => {
        render(<RecommendedSection tags={MOCK_ARTICLE_TAGS} />);

        const firstTag = screen.getAllByTestId('recommended-topic-tag')[0]
            .firstChild as Element;
        const allTopicsBtn = screen.getByRole('button', {
            name: /view all topics to follow/i,
        });

        await userEvent.click(firstTag);
        await userEvent.click(allTopicsBtn);
        await userEvent.click(firstTag);
        await userEvent.click(allTopicsBtn);

        // First call, ensure we're passing the tag to the modal
        expect(mockPropsFn.mock.calls[0][0].existingSelections).toStrictEqual([
            MOCK_ARTICLE_TAGS[0],
        ]);
        // Second call, tag should be deselected now, make sure we're passing an empty array to the modal
        expect(mockPropsFn.mock.calls[1][0].existingSelections).toStrictEqual(
            []
        );
    });
});
