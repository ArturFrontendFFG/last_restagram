import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({gap}) => gap};
`;
