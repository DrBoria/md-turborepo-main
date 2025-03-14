import { css } from 'styled-components';

export type TFullWidth = {
  /** expand component into 100% width */
  fullWidth?: boolean;
};

export const withFullWidth = css<TFullWidth>`
  ${({ fullWidth }) => (fullWidth ? 'width: 100%' : '')}
`;
