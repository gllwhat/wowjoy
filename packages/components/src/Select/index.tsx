import React from 'react';
import styled, { borderCss, withWowTheme } from '@wowjoy/styled';

const Selection = styled.div<any>`
  ${borderCss}
  height: 32px;
  outline: 0;
`;

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Select: React.FC<Props> = ({ ...props }) => {
  return <Selection tabIndex="0" {...props}></Selection>;
};

export default withWowTheme(Select, 'WowSelect-root');
