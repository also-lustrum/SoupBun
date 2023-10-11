<template>
  <slot
    v-if="show"
    :userPermissions="permissions"
  ></slot>
</template>

<script lang="ts" setup>
import { useAuth } from '../hooks/useAuth.ts'
import type { PropType } from 'vue'

const props = defineProps({
  permission: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  }
})

const { permissions } = useAuth()
const show = computed(() => {
  if (!props.permission) return true
  if (!permissions) return false
  if (isArray(props.permission)) {
    return props.permission.every((item) => permissions.includes(item))
  } else {
    return permissions.includes(props.permission)
  }
})
</script>
