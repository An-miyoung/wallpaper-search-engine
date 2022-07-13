import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import ImageContainer from './component/Image/ImageContainer';
import Footer from './component/Footer';
import './App.css';
import getWallpapers from './api/getWallpapers';
import EmptyResult from './component/EmptyResult';
import Title from './component/Title';
import Search from './component/Search/Search';
import { IGetWallPapersResponse, Orientation, Order } from './type';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const Header = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;

function App() {
    const [data, setData] = useState<IGetWallPapersResponse>({
        total: 0,
        totalHits: 0,
        hits: [],
    });
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState<Order>('popular');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [orientation, setOrientation] = useState<Orientation>('all');
    const [isOpen, setIsOpen] = useState(false);

    const targetRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallpapers({
                q: query,
                orientation: orientation,
                order: order,
                page: page.toString(),
                per_page: perPage.toString(),
            });
            if (page === 1) {
                setData(data);
            } else {
                setData((prevData) => ({
                    ...prevData,
                    hits: [...prevData.hits, ...data.hits],
                }));
            }
        };
        fetch();
    }, [query, orientation, order, page, perPage]);

    const callback: IntersectionObserverCallback = ([entries]) => {
        if (entries.isIntersecting) setPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (!targetRef.current) return;
        const observer = new IntersectionObserver(callback, {
            threshold: 1,
        });

        observer.observe(targetRef.current);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [query, order, orientation, perPage]);

    const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

    return (
        <>
            <Container>
                <Header>
                    <Title />
                    <Search
                        query={query}
                        setQuery={setQuery}
                        setOrientation={setOrientation}
                        setOrder={setOrder}
                        setPerPage={setPerPage}
                    />
                </Header>

                <ImageContainer
                    data={data}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    // page={page}
                    // setPage={setPage}
                    // numOfPages={numOfPages}
                />
                {numOfPages !== page && (
                    <div ref={targetRef}>
                        <EmptyResult isLoading={data.totalHits} />
                    </div>
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
