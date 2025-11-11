# 吉他音阶图查看器

一个便捷的在线吉他音阶图查看工具，帮助吉他手在练习时快速查看不同调性和音阶模式下的指板音程分布。

## 功能特性

### V1 MVP 功能
- ✅ 横向布局的24品、6弦吉他指板可视化
- ✅ 12个调性切换（C、C#、D、D#、E、F、F#、G、G#、A、A#、B）
- ✅ 2种音阶模式切换（自然大调音阶、五声音阶）
- ✅ 音程高亮显示（Root、3rd、5th），颜色区分
- ✅ 显示音名标签（C、D、E、F、G、A、B，含升降号）
- ✅ 桌面端响应式布局
- ✅ 显示范围切换（12品/24品）
- ✅ 横向滚动条（24品模式下可滚动查看全部）

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS Modules** - 样式管理

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── Header.tsx       # 顶部控制区
│   ├── Fretboard.tsx    # 指板组件
│   ├── NoteCell.tsx     # 音符单元格
│   └── Footer.tsx       # 底部信息区
├── utils/               # 业务逻辑
│   ├── noteMapper.ts    # 音名映射器
│   ├── scaleCalculator.ts  # 音阶计算器
│   ├── intervalCalculator.ts # 音程计算器
│   └── fretboardCalculator.ts # 指板计算器
├── types/               # TypeScript类型定义
│   └── index.ts
├── App.tsx              # 主应用组件
└── main.tsx             # 入口文件
```

## 使用说明

1. **选择调性**：在顶部控制区选择要查看的调性（C、C#、D等）
2. **选择音阶模式**：选择自然大调音阶或五声音阶
3. **切换显示范围**：选择显示12品或24品
4. **查看指板**：指板上会高亮显示当前音阶的音符
   - 红色：Root（根音）
   - 蓝色：3rd（三度）
   - 绿色：5th（五度）
5. **查看信息**：底部显示当前音阶的构成和音程信息

## 未来版本规划

详见 [PRD.md](./PRD.md)

## 许可证

MIT

