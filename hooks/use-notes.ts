import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notesApi } from '@/lib/api/notes'
import { useAuth } from '@/components/providers/auth-provider'
import type { NoteFormData } from '@/types'

export function useNotes() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['notes', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.getNotes(user.id)
    },
    enabled: !!user?.id,
  })
}

export function useNote(id: string | null) {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['notes', id, user?.id],
    queryFn: () => {
      if (!id || !user?.id) return null
      return notesApi.getNote(id, user.id)
    },
    enabled: !!id && !!user?.id,
  })
}

export function useAllTags() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['tags', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.getAllTags(user.id)
    },
    enabled: !!user?.id,
  })
}

export function useCreateNote() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (noteData: NoteFormData) => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.createNote(noteData, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

export function useUpdateNote() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NoteFormData> }) => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.updateNote(id, data, user.id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] })
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

export function useToggleArchive() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: ({ id, isArchived }: { id: string; isArchived: boolean }) => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.toggleArchive(id, isArchived, user.id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] })
    },
  })
}

export function useDeleteNote() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (id: string) => {
      if (!user?.id) throw new Error('User not authenticated')
      return notesApi.deleteNote(id, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}
