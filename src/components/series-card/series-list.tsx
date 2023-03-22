import NextLink from 'next/link';

import { listItemstyles, glyphStyles } from './styles';

interface SeriesListItem {
    text: string;
    url: string;
}

const SeriesList: React.FunctionComponent<{
    items: SeriesListItem[];
}> = ({ items }) => {
    return (
        <ul
            sx={{
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            }}
        >
            {items.map((item, index) => {
                return (
                    <li key={index} sx={listItemstyles}>
                        <span aria-label="glyph" sx={glyphStyles} />
                        <NextLink
                            href={item.url}
                            passHref
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.text}
                        </NextLink>
                    </li>
                );
            })}
        </ul>
    );
};
export default SeriesList;
