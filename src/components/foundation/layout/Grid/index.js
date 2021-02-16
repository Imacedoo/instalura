import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../../theme/utils/propToStyle';

export default {
  Container: styled.div`
      width: 100%;
      padding-right: 28px;
      padding-left: 28px;
      margin-right: auto;
      margin-left: auto;
      max-width: initial;
      ${breakpointsMedia({
    sm: css`
          max-width: 576px; 
        `,
    md: css`
          max-width: 768px;
          padding-right: 16px;
          padding-left: 16px; 
        `,
    lg: css`
          max-width: 1160px; 
        `,
    xl: css`
          max-width: 1222px;
        `,
  })}
      
      ${propToStyle('marginTop')}
    `,
  Row: styled.div`
      display: flex;
      flex-wrap: wrap;
      margin-right: -16px;
      margin-left: -16px;
    `,
  Col: styled.div`
      padding-right: 16px;
      padding-left: 16px;
      flex-basis: 0; //Força as colunas a ter a mesma largura sempre.
      flex-grow: 1;
      max-width: 100%;
      
      ${({ value }) => {
    if (typeof value === 'number') {
      return css`
                flex-grow: 0;
                flex-shrink: 0;
                flex-basis: ${(100 * value) / 12}%;
                max-width: ${(100 * value) / 12}%;
              `;
    }

    return breakpointsMedia({
      xs: value?.xs
        ? css`
              flex-grow: 0;
              flex-shrink: 0;
              flex-basis: ${(100 * value.xs) / 12}%;
              max-width: ${(100 * value.xs) / 12}%;
            ` : '',
      md: value?.md
        ? css`
              flex-grow: 0;
              flex-shrink: 0;
              flex-basis: ${(100 * value.md) / 12}%;
              max-width: ${(100 * value.md) / 12}%;
            ` : '',
    });
  }}

      ${({ offset }) => {
    if (typeof offset === 'number') {
      return css`
            margin-left: ${(100 * offset) / 12}%;
          `;
    }

    return breakpointsMedia({
      xs: offset?.xs
        ? css`
              margin-left: ${(100 * offset.xs) / 12}%};
            ` : '',
      md: offset?.md
        ? css`
              margin-left: ${(100 * offset.md) / 12}%};
            ` : '',
    });
  }}
      
      ${propToStyle('display')}
      ${propToStyle('alignItems')}
      ${propToStyle('justifyContent')}
      ${propToStyle('flexDirection')}
      ${propToStyle('marginBottom')}
    `,
};
