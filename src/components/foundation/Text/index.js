import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { propToStyle } from '../../../theme/utils/propToStyle';

export const TextStyleVariantMap = {
  paragraph1: css`
    font-size: ${({ theme }) => theme.typographyVariants.paragraph1.fontSize};
    font-weight: ${({ theme }) => theme.typographyVariants.paragraph1.fontWeight};
    line-height: ${({ theme }) => theme.typographyVariants.paragraph1.lineHeight};
  `,

  smallestException: css`
     font-size: ${({ theme }) => theme.typographyVariants.smallestException.fontSize};
     font-weight: ${({ theme }) => theme.typographyVariants.smallestException.fontWeight};
     line-height: ${({ theme }) => theme.typographyVariants.smallestException.lineHeight};
  `,
};

const TextBase = styled.span`
  ${(props) => TextStyleVariantMap[props.variant]}
  ${propToStyle('textAlign')}
`;

export default function Text({
  tag, variant, children, ...props
}) {
  return (
    <TextBase
      as={tag}
      variant={variant}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      {children}
    </TextBase>
  );
}

Text.propTypes = {
  tag: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
};
