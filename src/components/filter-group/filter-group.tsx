import {
    TypographyScale,
    SystemIcon,
    ESystemIconNames,
    Checkbox,
    Link,
} from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { useState } from 'react';
import { FilterGroupProps, FilterItem } from './types';

const titleStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 500,
};

const itemsStyles = (title: string | undefined) => ({
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: title === 'Products' ? 'inc50' : 'inc30', // Bigger space between L1s.
    marginTop: 'inc30',
});

const FilterGroup: React.FunctionComponent<FilterGroupProps> = ({
    className,
    title,
    items,
    filters,
    setFilters,
}) => {
    const [expanded, setExpanded] = useState<boolean>(title ? false : true);
    const [showAll, setShowAll] = useState<boolean>(false);

    const onExpand = () => {
        setShowAll(false);
        setExpanded(!expanded);
    };

    const onCheckToggle = (checked: boolean, filter: FilterItem) => {
        if (checked) {
            if (filter.subItems && filter.subItems.length) {
                const subItemsToAdd = filter.subItems.filter(
                    subItem =>
                        !filters.find(
                            ({ name, category }) =>
                                name === subItem.name &&
                                category === subItem.category
                        )
                );
                setFilters(filters.concat(filter).concat(subItemsToAdd));
            } else {
                setFilters(filters.concat(filter));
            }
        } else {
            setFilters(
                filters.filter(
                    ({ name, category }) =>
                        !(name === filter.name && category === filter.category)
                )
            );
        }
    };

    return (
        <div className={className}>
            {!!title && (
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
            )}
            {expanded && (
                <div>
                    <div sx={itemsStyles(title)}>
                        {items
                            .slice(0, showAll ? undefined : 5) // Show 5 to start, then all if they click "Show more"
                            .map(filter => {
                                if (filter.subItems && filter.subItems.length) {
                                    return (
                                        <div key={filter.name}>
                                            <Checkbox
                                                name={filter.name}
                                                label={filter.name}
                                                onToggle={checked =>
                                                    onCheckToggle(
                                                        checked,
                                                        filter
                                                    )
                                                }
                                                checked={
                                                    !!filters.find(
                                                        ({ category, name }) =>
                                                            filter.category ===
                                                                category &&
                                                            filter.name === name
                                                    )
                                                }
                                            />
                                            <FilterGroup
                                                sx={{ marginLeft: 'inc40' }}
                                                items={filter.subItems}
                                                filters={filters}
                                                setFilters={setFilters}
                                            />
                                        </div>
                                    );
                                }
                                return (
                                    <Checkbox
                                        key={filter.name}
                                        name={filter.name}
                                        label={filter.name}
                                        onToggle={checked =>
                                            onCheckToggle(checked, filter)
                                        }
                                        checked={
                                            !!filters.find(
                                                ({ category, name }) =>
                                                    filter.category ===
                                                        category &&
                                                    filter.name === name
                                            )
                                        }
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
