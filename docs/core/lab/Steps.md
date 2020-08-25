---
group:
  title: Lab 实验室
title: Steps 步骤条
---

# Steps 步骤条

## 操作步骤的任务引导和进度显示

```tsx
/**
 * title: 基本使用
 * desc: 横向步骤条
 */

import React from 'react';
import { Steps } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Steps
        sourceDatas={[
          { name: '步骤一啊', status: 'past' },
          { name: '步骤二', status: 'past' },
          { name: '步骤三', status: 'now' },
          { name: '已完成', status: 'future' },
        ]}
      />
      <Space />
    </>
  );
};
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type | 类型 | string | 'node' |
| sourceDatas | 进度数据 | {name: string, status: 'past' \| 'now'\| 'future'}[] |  |
| lastNodeShowRightIcon | 最后一个节点是否展示对号 默认展示 | boolean | true |
