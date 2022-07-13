import styled from 'styled-components';
import styles from '../Footer.module.css';

const FooterContainer = styled.div`
    text-align: center;
    font-size: 14px;
    padding: 0px 0 24px 0;
    color: var(--text);
`;

const Footer = () => {
    return (
        <FooterContainer className={styles.container}>
            ©2022 Hanameee Corp. All rights reserved.
        </FooterContainer>
    );
};

export default Footer;
