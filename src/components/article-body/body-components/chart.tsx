import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { buildQueryString } from '../../../utils/build-query-string';
import theme from '@mdb/flora/theme';
import { options } from 'sanitize-html';

const DEFAULT_CHART_AUTOREFRESH = 3600;
const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';
const DEFAULT_CHART_THEME = 'dark';

const getAlignment = (align: string) => {
    switch (align) {
        case 'left':
            return css`
                float: left;
            `;
        case 'right':
            return css`
                float: right;
            `;
        case 'center':
            return css`
                display: block;
                margin-left: auto;
                margin-right: auto;
            `;
        default:
            return null;
    }
};

const buildChartUrl = (options: any) => {
    const params = {
        autorefresh: options.autorefresh || DEFAULT_CHART_AUTOREFRESH,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${options.url}/embed/charts${queryString}`;
};

const StyledChart = styled('iframe')`
    background: ${({ pageTheme }) =>
        pageTheme === 'light' ? 'transparent' : theme.colors.black80};
    border: 1px solid ${theme.colors.border.default};
    ${({ customAlign }) => getAlignment(customAlign)};
    max-width: 100%;
`;

export const Chart = ({ options }) => {
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <StyledChart
            customAlign={options.align}
            pageTheme={options.theme || DEFAULT_CHART_THEME}
            height={options.height || DEFAULT_CHART_HEIGHT}
            title={options.title}
            src={chartSrc}
            width={options.width || DEFAULT_CHART_WIDTH}
        />
    );
};
