# 低代码平台组件开发规范

## 一、Git 分支规范

### 1. 标品

格式：`<分支类型>/<版本号>`

- **主分支**：`master`
- **开发分支**：`dev`
- **测试分支**：`test`
- **版本分支**：`features/1.2.0`
- **个人分支**：`features/1.2.0-liukeyan`

### 2. 项目

格式：`<项目名>/<分支类型>/<版本号>`

#### 2.1 以国债项目为例

- **主分支**：`bond/master`
- **开发分支**：`bond/dev`
- **测试分支**：`bond/test`
- **版本分支**：`bond/features/v1.2.0`
- **个人分支**：`bond/features/v1.2.0-liukeyan`

### 3. 分支合并

- **分支合并**：个人分支 -> 版本分支 -> 开发分支 -> 测试分支 -> 主分支

## 二、Git 提交规范

### 1. Commitlint 默认配置

Commitlint 默认配置基于 [Conventional Commit](https://www.conventionalcommits.org/) 规范，帮助规范化 Git 提交消息格式。

### 2. 默认规则（规则列表）

以下是 Commitlint 默认配置中的核心规则及其含义：

### 3. 提交消息的基本格式

提交消息必须遵循以下格式：

```plaintext
<type>(<scope>): <subject>
```

#### 3.1 type（必填）

描述提交的类型，例如功能新增、修复问题等。
默认支持的类型：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式（不影响逻辑的修改，例如空格、分号等）
- `refactor`: 代码重构（既不是新增功能，也不是修复 bug）
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动
- `perf`: 提升性能的修改
- `ci`: CI 配置文件和脚本的更改
- `build`: 构建相关的变更
- `revert`: 回滚某次提交

#### 3.2 scope（可选）

描述本次提交影响的范围，例如模块名称、功能名称等。
示例：

```plaintext
feat(auth): add login functionality
```

#### 3.3 subject（必填）

简单描述本次提交的内容，需符合以下规则：

- 开头使用小写字母。
- 避免使用句号结尾。

### 4. 默认规则校验列表

Commitlint 默认规则基于 `@commitlint/config-conventional`，以下是核心规则：

| 规则名称 | 描述 | 默认值 |
| ---- | ---- | ---- |
| `type-enum` | `type` 必须是预定义的类型之一 | 上述 `type` 列表 |
| `type-case` | `type` 必须为小写字母 | `lower-case` |
| `type-empty` | `type` 不能为空 | `false` |
| `scope-case` | `scope` 必须为小写 | `lower-case` |
| `scope-empty` | `scope` 可以为空 | `true` |
| `subject-case` | `subject` 必须为小写，且避免以句号结尾 | `sentence-case` |
| `subject-empty` | `subject` 不能为空 | `false` |
| `header-max-length` | 提交消息的标题（`type(scope): subject`）最长 72 个字符 | 72 |

### 5. 示例提交消息

#### 5.1 符合默认规则的示例

- `feat(api): add user authentication`
- `fix(ui): resolve dropdown rendering issue`
- `docs(readme): update installation instructions`

#### 5.2 不符合规则的示例

- `Feat: This breaks rules.` （`type` 大写，`subject` 以句号结尾。）
- `Fix(login): Login feature added.` （`type` 大写，且 `subject` 冗长。）

### 6. 如何查看和自定义默认规则？

#### 6.1 自定义规则（可选）

查看项目根目录下 `commitlint.config.js` 文件，如果需要覆盖默认规则，可以在配置文件中添加 `rules`：

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 100], // 将标题长度限制调整为 100
        'type-enum': [2, 'always', [
            'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build', 'revert', 'custom'
        ]] // 添加自定义类型 'custom'
    }
};
```

## 三、CSS 规范

常见的 CSS 属性基于 `布局 -> 视觉 -> 行为` 逻辑的分组的

### 1. 相关配置

```json
{
  "order/properties-order": [
    // 1. 布局相关属性
    {
      "groupName": "Positioning",
      "properties": [
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index"
      ]
    },
    // 2. 显示与布局模型
    {
      "groupName": "Box Model",
      "properties": [
        "display",
        "flex",
        "flex-grow",
        "flex-shrink",
        "flex-basis",
        "flex-direction",
        "flex-wrap",
        "justify-content",
        "align-items",
        "align-content",
        "order",
        "grid-template-rows",
        "grid-template-columns",
        "grid-template-areas",
        "grid-auto-rows",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-column",
        "grid-column-start",
        "grid-column-end",
        "grid-row",
        "grid-row-start",
        "grid-row-end",
        "gap",
        "row-gap",
        "column-gap"
      ]
    },
    // 3. 宽高与边距
    {
      "groupName": "Size & Spacing",
      "properties": [
        "box-sizing",
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "margin",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "padding",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left"
      ]
    },
    // 4. 边框与外观
    {
      "groupName": "Borders & Appearance",
      "properties": [
        "border",
        "border-width",
        "border-style",
        "border-color",
        "border-top",
        "border-right",
        "border-bottom",
        "border-left",
        "border-radius",
        "outline",
        "outline-width",
        "outline-style",
        "outline-color",
        "box-shadow",
        "overflow",
        "overflow-x",
        "overflow-y"
      ]
    },
    // 5. 背景
    {
      "groupName": "Background",
      "properties": [
        "background",
        "background-color",
        "background-image",
        "background-position",
        "background-size",
        "background-repeat",
        "background-origin",
        "background-clip",
        "background-attachment"
      ]
    },
    // 6. 文字与字体
    {
      "groupName": "Typography",
      "properties": [
        "color",
        "font",
        "font-family",
        "font-size",
        "font-style",
        "font-weight",
        "font-variant",
        "letter-spacing",
        "line-height",
        "text-align",
        "text-decoration",
        "text-transform",
        "text-shadow",
        "vertical-align",
        "white-space",
        "word-break",
        "word-spacing"
      ]
    },
    // 7. 其他
    {
      "groupName": "Other",
      "properties": [
        "cursor",
        "visibility",
        "opacity",
        "animation",
        "transition",
        "clip-path",
        "content"
      ]
    }
  ]
}
```

### 2. 属性逻辑说明

为了保持 CSS 代码的一致性和可读性，常见 CSS 属性按照以下逻辑顺序书写：

#### 2.1 布局优先

设置元素的定位、显示模式，以及与其他元素的关系。

#### 2.2 盒模型

定义元素的宽高、边距、内边距等内容。

#### 2.3 视觉样式

包括背景、边框、阴影等视觉相关的属性。

#### 2.4 文本样式

字体、颜色、行高、对齐方式等文字内容相关属性。

#### 2.5 其他属性

动画、透明度、光标样式等其他行为和效果相关的属性。
