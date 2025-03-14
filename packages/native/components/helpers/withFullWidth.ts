import { css } from 'styled-components/native';

export type TFullWidth = {
  /** expand component into 100% width */
  fullWidth?: boolean;
};

export const withFullWidth = css`
  ${({ fullWidth }: TFullWidth) => (fullWidth ? 'width: 100%' : '')}
`;
