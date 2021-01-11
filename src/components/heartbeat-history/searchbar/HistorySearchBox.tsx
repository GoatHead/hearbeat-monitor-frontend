import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    IDropdownStyles,
    ISearchBoxStyles,
    SearchBox,
    Stack
} from 'office-ui-fabric-react';
import {SearchCondition} from "../../../types/searchCondition";

const options: IDropdownOption[] = [
    { key: 'searchCondition', text: '검색 조건', itemType: DropdownMenuItemType.Header },
    { key: 'name', text: '이름', selected: true },
    { key: 'url', text: 'URL' },
    { key: 'status', text: '상태 코드'}
];

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 100, marginLeft: '15px', marginRight: '15px', marginTop: '29.5px' },
};

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, marginTop: '29.5px' } };

export const HistorySearchBox: React.FunctionComponent<{setSearchCondition: Function, fetcher: Function}> = ({setSearchCondition, fetcher}) => {
    const [selectedCondition, setSelectedCondition] = useState<'name' | 'url' | 'status'>('name')
    const [searchWord, setSearchWord] = useState('')
    const [search, setSearch] = useState(false)

    const handleTextChange = (newValue: string | undefined) =>  {
        if (newValue !== undefined) {
            setSearchWord(newValue)
        }
    }

    const handleSearch = () => {
        setSearchCondition((prevState: any) => ({
            ...prevState,
            name: '',
            url: '',
            status: '',
            [selectedCondition]: searchWord
        }))
        setSearch(true)
    }

    useEffect(() => {
        if (search) {
            setSearch(false)
            fetcher()
        }
    }, [search])

    return <Stack horizontal>
            <Dropdown
                placeHolder="선택"
                options={options}
                onChanged={(selectedOption) => {
                    if (selectedOption !== undefined) {
                        switch (selectedOption.key) {
                            case 'name':
                            case 'url':
                            case 'status':
                                setSelectedCondition(selectedOption.key);
                                handleTextChange('');
                        }
                    }
                }}
                styles={dropdownStyles}
                />
            <SearchBox
            id="history-search-box"
            styles={searchBoxStyles}
            placeholder="검색어를 입력하고 Enter..."
            value={searchWord}
            onEscape={ev => {
                console.log('Custom onEscape Called');
            }}
            onClear={ev => {
                handleTextChange('')
            }}
            onChanged={(newValue) => handleTextChange(newValue)}
            onSearch={newValue => handleSearch()}
        />
    </Stack>
}