import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecommendedSection from './recommended-section';
import { MOCK_ARTICLE_TAGS, MOCK_ARTICLE_CONTENT } from '../../mockdata';

const mockContent = {
    contentItems: MOCK_ARTICLE_CONTENT,
    followedTags: MOCK_ARTICLE_TAGS,
};

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

    test('Selecting a tag calls onTagSelected prop', async () => {
        const mockTagSelected = jest.fn();

        render(
            <RecommendedSection
                tags={MOCK_ARTICLE_TAGS}
                onTagSelected={mockTagSelected}
            />
        );
        const firstTag = screen.getAllByTestId('recommended-topic-tag')[0]
            .firstChild as Element;

        await userEvent.click(firstTag);

        expect(mockTagSelected).toBeCalledWith(MOCK_ARTICLE_TAGS[0], [
            MOCK_ARTICLE_TAGS[0],
        ]);
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
});
