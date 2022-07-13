import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import ImageCard from './ImageCard';
// import ImageModal from './ImageModal';
// import Pagination from './Pagination';
// import EmptyResult from './EmptyResult';

const ImageModal = React.lazy(() => import('./ImageModal'));

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ImageContainer = ({
    data,
    isOpen,
    setIsOpen,
    // page,
    // setPage,
    // numOfPages,
}) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    const openModal = (imgData) => {
        setCurrentImageDetail(imgData);
        setIsOpen(true);
    };

    return (
        <Container>
            <Suspense fallback={<h1>로딩중...</h1>}>
                {isOpen && (
                    <ImageModal
                        currentImageDetail={currentImageDetail}
                        setIsOpen={setIsOpen}
                    />
                )}
            </Suspense>

            {/* {data.hits?.length > 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
            )} */}
            <ResultsWrapper>
                {data.hits?.map((imgData, idx) => (
                    <ImageCard
                        key={`${imgData.id}${idx}`}
                        imgData={imgData}
                        onClick={() => openModal(imgData)}
                    />
                ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ImageContainer;
