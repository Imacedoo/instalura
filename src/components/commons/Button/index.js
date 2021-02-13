import styled, { css } from 'styled-components';
import get from 'lodash/get';
import {TextStyleVariantMap} from "../../foundation/Text";
import {breakpointsMedia} from "../../../theme/utils/breakpointsMedia";

const ButtonGhost = css`
    color: ${(theme, variant) => get(theme, `colors.${variant}.color`)};
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
    transition: opacity ${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${breakpointsMedia({
      xs: css`
        ${TextStyleVariantMap.smallestException}
      `,
      md: css`
        padding: 12px 43px;
        ${TextStyleVariantMap.paragraph1}
      `,
    })}
    ${({ ghost }) => ghost ? ButtonGhost : ButtonDefault}
    &:hover,
    &:focus {
        opacity: .5;
    }
`;