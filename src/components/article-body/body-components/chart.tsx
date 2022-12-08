import React, { useMemo } from 'react';

const DEFAULT_CHART_AUTOREFRESH = 3600;
const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_THEME = 'dark';

interface ChartObject {
    autorefresh?: string;
    id?: string;
    theme?: string;
    url?: string;
    title?: string;
    height?: string;
    width?: string;
}

const buildQueryString = (params: any) => {
    const entries = Object.keys(params)
        .sort()
        .map(
            key =>
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        );
    const string = entries.join('&');
    return string.length === 0 ? '' : '?' + string;
};

const buildChartUrl = (options: ChartObject) => {
    const params = {
        autorefresh: options.autorefresh || DEFAULT_CHART_AUTOREFRESH,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${options.url}/embed/charts${queryString}`;
};

const chartStyles = (pageTheme: string) => ({
    backgroundColor: pageTheme === 'light' ? 'transparent' : 'black80',
    border: '1px solid colors.border.default',
    maxWidth: '100%',
});

export const Chart = ({ options }: any) => {
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <iframe
            sx={chartStyles(options.theme)}
            height={options.height || DEFAULT_CHART_HEIGHT}
            title={options.title}
            src={chartSrc}
            width="100%"
        />
    );
};
