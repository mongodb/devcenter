import {
    TypographyScale,
    SystemIcon,
    ESystemIconNames,
    Checkbox,
    Link,
} from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { useState } from 'react';

interface FilterItem {
    name: string;
    subItems?: FilterItem[];
}

interface FilterGroupProps {
    className?: string;
    title: string;
    items: FilterItem[];
    filters: string[];
    setFilters: (filters: string[]) => void;
}

const titleStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
};

const itemsStyles = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: 'inc30',
    marginTop: 'inc30',
};

const FilterGroup: React.FunctionComponent<FilterGroupProps> = ({
    className,
    title,
    items,
    filters,
    setFilters,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);

    const onExpand = () => {
        setShowAll(false);
        setExpanded(!expanded);
    };

    const onCheckToggle = (checked: boolean, name: string) => {
        if (checked) {
            setFilters(filters.concat(name));
        } else {
            setFilters(filters.filter(item => item !== name));
        }
    };

    return (
        <div className={className}>
            <div sx={titleStyles} onClick={onExpand}>
                <TypographyScale variant="body1">{title}</TypographyScale>
                <SystemIcon
                    size="small"
                    strokeWeight="medium"
                    name={ESystemIconNames.CHEVRON_DOWN}
                    sx={{
                        transform: expanded ? 'rotate(180deg)' : null,
                        transitionDuration: theme.motion.linkAnimation,
                    }}
                />
            </div>
            {expanded && (
                <div>
                    <div sx={itemsStyles}>
                        {items
                            .slice(0, showAll ? undefined : 5) // Show 5 to start, then all if they click "Show more"
                            .map(({ name, subItems }) => {
                                return (
                                    <Checkbox
                                        key={name}
                                        name={name}
                                        label={name}
                                        onToggle={checked =>
                                            onCheckToggle(checked, name)
                                        }
                                        checked={filters.includes(name)}
                                    />
                                );
                            })}
                    </div>
                    {items.length > 5 && (
                        <Link
                            onClick={() => setShowAll(!showAll)}
                            sx={{ marginTop: 'inc30' }}
                        >
                            Show {showAll ? 'less' : 'more'}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterGroup;
