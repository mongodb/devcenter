import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { buildQueryString } from '../../../utils/build-query-string';

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

interface ChartObject {
    autorefresh?: string;
    id?: string;
    theme?: string;
    url?: string;
    title?: string;
    height?: string;
    width?: string;
}

const buildChartUrl = (options: ChartObject) => {
    const params = {
        autorefresh: options.autorefresh || DEFAULT_CHART_AUTOREFRESH,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${options.url}/embed/charts${queryString}`;
};

const chartStyles = (pageTheme: any, customAlign: any) => {
    // TODO how to pass alignment css as sx property
    const alignment = getAlignment(customAlign);
    const background = pageTheme === 'light' ? 'transparent' : 'black80';
    return {
        backgroundColor: background,
        border: '1px solid colors.border.default',
        maxWidth: '100%',
    };
};

export const Chart = ({ options }: any) => {
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <iframe
            sx={chartStyles(options.theme, options.align)}
            height={options.height || DEFAULT_CHART_HEIGHT}
            title={options.title}
            src={chartSrc}
            width={options.width || DEFAULT_CHART_WIDTH}
        />
    );
};
