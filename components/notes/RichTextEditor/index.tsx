'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { getExtensions } from './extensions'
import { Toolbar } from './Toolbar'
import './styles.css'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: getExtensions(placeholder),
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    immediatelyRender: false,
  })

  // Update editor content when prop changes (but avoid infinite loops)
  // Only update if content differs from current editor content
  if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content, { emitUpdate: false })
  }

  return (
    <div className={`tiptap-editor ${className}`}>
      <Toolbar editor={editor} />
      <div className="overflow-y-auto rounded-b-md border-2 border-dashed border-(--color-border) bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
