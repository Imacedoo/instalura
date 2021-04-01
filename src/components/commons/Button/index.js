import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { TextStyleVariantMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../theme/utils/propToStyle';
import Link from '../Link';

const ButtonGhost = css`
    color: ${(theme, variant) => get(theme, `colors.${variant}.color`)};
    background: transparent;
`;

const ButtonDefault = css`
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

const ButtonWrapper = styled.button`
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
    ${({ ghost }) => (ghost ? ButtonGhost : ButtonDefault)}
    &:hover,
    &:focus {
        opacity: .5;
    }

  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};

    ${propToStyle('margin')}
    ${propToStyle('display')}
`;

export default function Button({ href, children, ...props }) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';
  return (
    <ButtonWrapper
      as={tag}
      href={href}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      { children }
    </ButtonWrapper>
  );
}

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};
