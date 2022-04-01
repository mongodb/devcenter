import { Paragraph } from './body-components/paragraph';
import { Root } from './body-components/root';
import { Text } from './body-components/text';
import { CodeBlock } from './body-components/codeblock';
import { Reference } from './body-components/reference';
import { List } from './body-components/list';
import { ListItem } from './body-components/listitem';
import { InlineCode } from './body-components/inlinecode';
import { Heading } from './body-components/heading';
import { Emphasis } from './body-components/html-tags/emphasis';
import { Chart } from './body-components/chart';
import { Break } from './body-components/html-tags/break';
import { Strong } from './body-components/html-tags/strong';
import RawHTML from './body-components/raw-html';
import { Table } from './body-components/table';
import { VideoEmbed } from './body-components/video-embed';
import { TableRow } from './body-components/table-row';
import { TableCell } from './body-components/table-cell';

const componentMap = {
    paragraph: Paragraph,
    root: Root,
    text: Text,
    code: CodeBlock,
    link: Reference,
    list: List,
    listItem: ListItem,
    inlineCode: InlineCode,
    heading: Heading,
    emphasis: Emphasis,
    charts: Chart,
    break: Break,
    strong: Strong,
    html: RawHTML,
    table: Table,
    youtube: VideoEmbed,
    tableRow: TableRow,
    tableCell: TableCell,
};
export const ComponentFactory = ({ nodeData, ...rest }) => {
    const selectComponent = () => {
        const { name, type } = nodeData;
        const lookup = type === 'directive' ? name : type;
        let ComponentType = componentMap[lookup];
        if (!ComponentType) {
            console.warn(`${name} (${type}) not yet implemented)`);
            return null;
        }
        return <ComponentType {...nodeData} {...rest} />;
    };
    return selectComponent();
};
