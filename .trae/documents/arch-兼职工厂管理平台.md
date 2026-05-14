# 技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────┐
│            前端应用 (React)              │
├─────────────────────────────────────────┤
│  组件层: Pages / Components / Hooks     │
├─────────────────────────────────────────┤
│  业务逻辑层: Services (解析/导出/状态)    │
├─────────────────────────────────────────┤
│  数据层: 本地存储 (localStorage)          │
└─────────────────────────────────────────┘
```

**架构说明：**
- 前端单页应用，无需后端服务
- 数据存储使用浏览器本地存储（localStorage）
- 所有操作在前端完成，保护数据隐私

## 2. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 最新版 | 构建工具 |
| TailwindCSS | 3.x | 样式框架 |
| xlsx | ^0.18.5 | Excel导出 |
| Lucide React | 最新版 | 图标库 |

## 3. 路由设计

| 路由 | 组件 | 用途 |
|------|------|------|
| / | App | 主容器 |
| /part-time | PartTimePage | 兼职管理页面 |
| /factory | FactoryPage | 工厂管理页面 |

**导航结构：**
- 顶部导航栏包含"兼职"和"工厂"两个主要入口
- 当前页面标签高亮显示

## 4. 组件设计

### 4.1 页面组件

```
src/pages/
├── PartTimePage.tsx    # 兼职管理页面
└── FactoryPage.tsx     # 工厂管理页面
```

### 4.2 通用组件

```
src/components/
├── Header.tsx          # 顶部导航
├── JobCard.tsx         # 招聘信息卡片
├── JobTable.tsx        # 招聘信息表格
├── AddForm.tsx         # 添加/编辑表单
├── TextParser.tsx      # 文本解析器
└── ExportButton.tsx    # 导出按钮
```

### 4.3 Hooks

```
src/hooks/
├── usePartTimeJobs.ts  # 兼职数据管理
├── useFactoryJobs.ts   # 工厂数据管理
└── useTextParser.ts    # 文本解析逻辑
```

## 5. 数据模型

### 5.1 兼职数据结构

```typescript
interface PartTimeJob {
  id: string;
  salary: number;
  location: string;
  date: string;
  time: string;
  requirements: string;
  clothing: string;
  meals: string;
  contact: string;
  idRequired: boolean;
  deposit: string;
  notes: string;
  createdAt: string;
}
```

### 5.2 工厂数据结构

```typescript
interface FactoryJob {
  id: string;
  hourlyRate: number;
  location: string;
  date: string;
  interviewTime: string;
  age: string;
  gender: string;
  workContent: string;
  workHours: string;
  advancePayment: string;
  paymentDate: string;
  accommodation: string;
  deposit: string;
  meals: string;
  insurance: string;
  notes: string;
  createdAt: string;
}
```

## 6. 文本解析规则

### 6.1 兼职文本解析

**识别模式：**
- 薪资：`💰数字/天` 或 `数字元每天`
- 地点：`国博` 或 `XX地点`
- 日期：`XX-XX号` 或 `XX号`
- 时间：`数字:数字-数字:数字`
- 包餐：`包中餐` 或 `包餐`
- 身高要求：`穿鞋数字+` 或 `数字以上`
- 年龄：`数字岁内` 或 `数字岁`
- 押金：`压斤数字` 或 `押金数字`

### 6.2 工厂文本解析

**识别模式：**
- 时薪：`数字元/小时` 或 `数字元每小时`
- 地点：地址关键词
- 日期范围：`数字号-数字号`
- 面试时间：`面试时间数字点-数字点`
- 年龄：`数字-数字岁`
- 性别：`男女不限` 或 `男` 或 `女`
- 工作内容：`拣货` `打包` `印花` 等
- 住宿：`包住宿` 或 `提供宿舍`
- 押金：`押金数字元`

## 7. Excel导出实现

### 7.1 导出函数

```typescript
// 使用xlsx库导出Excel
import * as XLSX from 'xlsx';

function exportToExcel(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, filename);
}
```

### 7.2 导出字段映射

**兼职导出字段：**
- 日薪、单位、地点、日期、时间、要求、服装、餐食、联系方式、身份证要求、押金、备注

**工厂导出字段：**
- 时薪、地点、日期、面试时间、年龄、性别、工作内容、工作时长、预支政策、发薪日、住宿、押金、餐饮、保险、备注

## 8. 状态管理

**使用 React Hooks + Context：**
- `JobContext` - 提供全局状态
- `usePartTimeJobs` - 兼职数据操作
- `useFactoryJobs` - 工厂数据操作

**持久化策略：**
- 每次数据变更自动保存到 localStorage
- 页面加载时从 localStorage 恢复数据
- 数据键名：`partTimeJobs` 和 `factoryJobs`
