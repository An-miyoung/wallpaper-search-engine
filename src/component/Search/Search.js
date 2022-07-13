import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';
import debounce from '../../util/debounce';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ query, setQuery, setOrientation, setOrder, setPerPage }) => {
    const savedLocalStorage = localStorage.getItem('searchTags');
    const initialTags = savedLocalStorage ? JSON.parse(savedLocalStorage) : [];
    const inputRef = useRef(null);
    const [searchOption, setSearchOption] = useState(false);
    const [searchTags, setSearchTags] = useState(initialTags);

    const updateSearchInput = (value) => {
        inputRef.current.value = value;
    };

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            const currentValue = e.target.value;
            setQuery(currentValue);
            setSearchTags((prev) => [...prev, currentValue]);
            updateSearchInput(' ');
        }
    };

    const searchTag = (tag) => {
        setQuery(tag);
        updateSearchInput(tag);
    };

    const deleteTag = (tag) => {
        const newTagList = searchTags.filter((t) => t !== tag);
        setSearchTags(newTagList);
    };

    useEffect(() => {
        localStorage.setItem('searchTags', JSON.stringify(searchTags));
    }, [searchTags]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        ref={inputRef}
                        placeholder="검색어 입력 후 ENTER"
                        onKeyDown={onSearch}
                        onClick={() => updateSearchInput(' ')}
                        onChange={(e) =>
                            debounce((e) => console.log(e.target.value), 200, e)
                        }
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                <div hidden={!searchOption}>
                    <SearchOption
                        setOrientation={setOrientation}
                        setOrder={setOrder}
                        setPerPage={setPerPage}
                    />
                </div>
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchTags?.map((tag, idx) => (
                    <SearchTag
                        key={idx}
                        tag={tag}
                        searchTag={() => searchTag(tag)}
                        deleteTag={() => deleteTag(tag)}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
