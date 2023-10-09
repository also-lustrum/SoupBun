export function useAuth(): { permissions: string[] } {
  return {
    permissions: ['sys:user:view', 'sys:user:add', 'sys:user:edit']
  }
}