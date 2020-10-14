/*
 * @Author: guolili
 * @Date: 2020-08-25 15:42:32
 * @Last Modified by: guolili
 * @Last Modified time: 2020-08-25 16:16:05
 */

import React, { FC, useEffect, useState, ReactDOM } from 'react';
import styled, { useWowTheme, withWowTheme } from '@wowjoy/styled';
import { CheckCircle } from '@wowjoy/icons';

const StepsBox = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StepBox = styled.div<any>`
  display: flex;
  width: ${p => `${p.idx === 0 ? '24px' : 100 / (p.length - 1) + '%'}`};
`;

const Step = styled.div<any>`
  width: 24px;
  height: 24px;
  background: ${p =>
    p.status === 'future' ? p.theme.palette.background.default : p.theme.palette.primary.main};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p =>
    p.status === 'future'
      ? p.theme.palette.grey.borderColor
      : p.theme.palette.primary.contrastText};
  margin-bottom: 10px;
  border: ${p => (p.status === 'future' ? `1px solid  ${p.theme.palette.grey.borderColor}` : 0)};
`;
const LastStepIcon = styled(CheckCircle)<any>`
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
  color: ${p =>
    p.status === 'future' ? p.theme.palette.grey.borderColor : p.theme.palette.primary.main};
`;
const StepText = styled.span<any>`
  display: block;
  height: ${p => `${p.theme.typography.body2}px`};
  transform: ${p => `translateX(-${(p.text.length * 12) / 2 - 12}px)`};
  white-space: nowrap;
  font-weight: 400;
  font-size: ${p => `${p.theme.typography.body2}px`};
  text-align: center;
  color: ${p => (p.status === 'now' ? p.theme.palette.primary.main : p.theme.palette.text.hint)};
  line-height: ${p => `${p.theme.typography.body2}px`};
  letter-spacing: 1px;
`;
const StepLine = styled.span<any>`
  display: inline-block;
  height: 2px;
  flex: 1;
  background: ${p =>
    p.status === 'future' ? p.theme.palette.grey.borderColor : p.theme.palette.primary.main};
  margin: 0 10px;
  transform: translateY(12px);
`;

interface sourceDatasType {
  name: string;
  status: 'past' | 'now' | 'future';
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // 步骤数据
  sourceDatas: sourceDatasType[];
  // 最后一个节点是否展示对号 默认展示
  lastNodeShowRightIcon?: boolean;
  type?: 'node' | 'line';
}

const Steps: FC<Props> = ({
  sourceDatas,
  lastNodeShowRightIcon = true,
  type = 'node',
  ...props
}) => {
  const theme = useWowTheme();

  const [StepChild, setStepChild] = useState([]);

  useEffect(() => {
    let children = [];
    switch (type) {
      case 'node':
        sourceDatas.map((item, index) => {
          children.push({
            step: (
              <div style={{ width: '24px' }}>
                {lastNodeShowRightIcon && index === sourceDatas.length - 1 ? (
                  <LastStepIcon theme={theme} status={item.status} />
                ) : (
                  <Step key={index + 1} theme={theme} status={item.status}>
                    {index + 1}
                  </Step>
                )}

                <StepText theme={theme} text={item.name} status={item.status}>
                  {item.name}
                </StepText>
              </div>
            ),
            line: index !== 0,
            status: item.status,
          });
        });
        break;
      case 'line':
        break;
      default:
        break;
    }

    setStepChild(children);
  }, [sourceDatas]);

  return (
    <StepsBox theme={theme}>
      {StepChild.map((s, idx) => {
        return (
          <StepBox length={sourceDatas.length} idx={idx}>
            {s.line ? <StepLine theme={theme} status={s.status} /> : null}
            {s.step}
          </StepBox>
        );
      })}
    </StepsBox>
  );
};

export default withWowTheme(Steps, 'WowSteps-root');
