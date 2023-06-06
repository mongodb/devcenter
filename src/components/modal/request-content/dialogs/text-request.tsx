import { useState } from 'react';
import { TypographyScale, Button, TextArea, Select } from '@mdb/flora';

import { TextRequestProps } from '../types';
import { modalWrapperStyles } from '../../shared/styles';

import { getRequestBtnText } from '../../../../utils/page-template-helpers';

import allMetaInfoPreval from '../../../../service/get-all-meta-info.preval';

const TextRequest: React.FunctionComponent<TextRequestProps> = ({
    onContinue,
    contentCategory,
}) => {
    const title = getRequestBtnText(contentCategory);

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [programmingLanguage, setProgrammingLanguage] = useState('');

    const [descTyped, setDescTyped] = useState(false);
    const [topicSelected, setTopicSelected] = useState(false);
    const [programmingLanguageSelected, setProgrammingLanguageSelected] =
        useState(false);

    const languages = allMetaInfoPreval
        .filter(tag => tag.category === 'ProgrammingLanguage')
        .map(tag => tag.tagName)
        .sort();
    languages.unshift('N/A');

    const topics = allMetaInfoPreval
        .filter(tag => tag.category === 'Technology')
        .map(tag => tag.tagName)
        .sort();
    topics.unshift('N/A');

    return (
        <div sx={modalWrapperStyles}>
            <TypographyScale
                variant="heading5"
                sx={{
                    display: 'block',
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                {title}
            </TypographyScale>
            <div sx={{ marginBottom: 'inc30' }}>
                <Select
                    name="topic"
                    label="Topic"
                    options={topics}
                    onSelect={(value?: string) => setTopic(value || '')}
                    value={topic}
                    invalid={!topic && topicSelected}
                />
            </div>
            <div sx={{ marginBottom: 'inc30' }}>
                <Select
                    name="programming_language"
                    label="Programming Language"
                    options={languages}
                    onSelect={(value?: string) =>
                        setProgrammingLanguage(value || '')
                    }
                    value={programmingLanguage}
                    invalid={
                        !programmingLanguage && programmingLanguageSelected
                    }
                />
            </div>
            <div sx={{ marginBottom: 'inc30' }}>
                <TextArea
                    name="description"
                    label="Description"
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                        setDescTyped(true);
                    }}
                    textAreaStyles={{ resize: 'vertical' }}
                    invalid={!description && descTyped}
                />
            </div>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => {
                        if (topic && programmingLanguage && description) {
                            onContinue(topic, description, programmingLanguage);
                        } else {
                            setDescTyped(true);
                            setTopicSelected(true);
                            setProgrammingLanguageSelected(true);
                        }
                    }}
                    size="small"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default TextRequest;
