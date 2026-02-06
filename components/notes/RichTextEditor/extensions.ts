import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'

export const getExtensions = (placeholder?: string) => [
  StarterKit.configure({
    // Disable default extensions that we'll configure separately
    heading: {
      levels: [1, 2, 3],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  
  // Typography for markdown shortcuts
  Typography,

  // Image support
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-md max-w-full h-auto',
    },
  }),

  // Link support
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 hover:text-blue-800 underline cursor-pointer',
      rel: 'noopener noreferrer',
      target: '_blank',
    },
  }),

  // Table support
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full my-4',
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: 'border border-gray-300',
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 bg-gray-100 font-bold px-3 py-2 text-left',
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 px-3 py-2',
    },
  }),

  // Task list support
  TaskList.configure({
    HTMLAttributes: {
      class: 'list-none pl-0',
    },
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: 'flex items-start gap-2',
    },
  }),

  // Placeholder text
  Placeholder.configure({
    placeholder: placeholder || 'Start writing...',
    emptyEditorClass: 'is-editor-empty',
  }),
]
