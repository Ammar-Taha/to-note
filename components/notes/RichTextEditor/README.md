# Rich Text Editor

A feature-rich text editor built with [Tiptap](https://tiptap.dev/) for the ToNote note-taking app.

## Features

### Text Formatting
- **Bold** (Ctrl+B or `**text**`)
- *Italic* (Ctrl+I or `*text*`)
- ~~Strikethrough~~
- `Inline Code`

### Headings
- Heading 1 (`# ` at start of line)
- Heading 2 (`## ` at start of line)
- Heading 3 (`### ` at start of line)

### Lists
- Bullet Lists (`- ` at start of line)
- Numbered Lists (`1. ` at start of line)
- Task Lists (`[ ]` at start of line)

### Advanced Features
- 🔗 Links - Insert and edit hyperlinks
- 🖼️ Images - Insert images via URL
- 📋 Tables - Create and edit tables
- 📝 Blockquotes (`> ` at start of line)
- 💻 Code Blocks (` ``` ` at start of line)
- ➖ Horizontal Rules

### Markdown Shortcuts
The editor supports markdown shortcuts for quick formatting:
- Type `# ` at the beginning of a line for Heading 1
- Type `## ` for Heading 2
- Type `### ` for Heading 3
- Type `**text**` for **bold**
- Type `*text*` for *italic*
- Type `- ` for bullet lists
- Type `1. ` for numbered lists
- Type `[ ]` for task lists
- Type `` `code` `` for inline code
- Type ` ``` ` for code blocks
- Type `> ` for blockquotes

## Usage

The RichTextEditor component is already integrated into the NoteEditor. When you create or edit notes, you'll see a toolbar above the editor with formatting options.

### Keyboard Shortcuts
- **Ctrl+B** - Toggle bold
- **Ctrl+I** - Toggle italic
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo

### Content Storage
- Content is stored as HTML in the database
- Existing plain text notes are automatically converted to HTML paragraphs
- Full backward compatibility with existing notes

## Component Structure

```
RichTextEditor/
├── index.tsx       - Main editor component
├── Toolbar.tsx     - Formatting toolbar
├── extensions.ts   - Tiptap extensions configuration
├── styles.css      - Editor-specific styles
└── README.md       - This file
```

## Technical Details

### Dependencies
- `@tiptap/react` - React bindings for Tiptap
- `@tiptap/starter-kit` - Essential extensions bundle
- `@tiptap/extension-*` - Additional feature extensions

### Extensions Used
1. **StarterKit** - Core functionality (bold, italic, lists, etc.)
2. **Typography** - Markdown shortcuts and smart typography
3. **Image** - Image insertion support
4. **Link** - Hyperlink support
5. **Table** - Table creation and editing
6. **TaskList** - Checkbox task lists
7. **Placeholder** - Placeholder text

## Future Enhancements
- File upload for images (instead of URL only)
- Drag and drop image upload
- Mention suggestions (@user)
- Emoji picker
- Export to Markdown/PDF
- Collaboration features
