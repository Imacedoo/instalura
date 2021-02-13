import styled, { css } from 'styled-components';
import get from 'lodash/get';
import {TextStyleVariantMap} from "../../foundation/Text";

const ButtonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};;
    background: transparent;
`;

const ButtonDefault = css`
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

export const Button = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    ${TextStyleVariantMap.smallestException}
    transition: opacity ${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${({ ghost }) => ghost ? ButtonGhost : ButtonDefault}
    &:hover,
    &:focus {
        opacity: .5;
    }
`;