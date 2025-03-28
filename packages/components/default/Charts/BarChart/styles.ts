import styled from 'styled-components';

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.offsets.betweenElements};
`;

export const ColoredDot = styled.div`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  margin-right: ${({ theme }) => theme.offsets.betweenElements};

  background: ${({ theme: { colors } }) => colors.section};
  border-radius: ${({ theme }) => theme.border.circle};
`;
