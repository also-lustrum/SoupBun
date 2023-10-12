<template>
  <div class="page">
    <button @click="clickHandler('add')">add</button>
    <button @click="clickHandler('delete')">delete</button>
    <ul ref="containerRefs">
      <transition-group name="fade">
        <li
          v-for="item in list"
          :key="item.name"
        >
          {{ item.name }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface ElementWithStartPosition extends Element {
  startX: number
  startY: number
}

const containerRefs = ref<ElementWithStartPosition | null>(null)
const list = ref([{ name: 1 }])

const clickHandler = (type: 'add' | 'delete') => {
  first()
  change(type)
}

const change = (type: 'add' | 'delete') => {
  switch (type) {
    case 'delete':
      deleteItem()
      break
    case 'add':
      add()
      break
    default:
      const n: never = type
      return n
  }
}

const add = () => {
  list.value.unshift({
    name: ~~(Math.random() * 1000)
  })
  nextTick(() => {
    last()
  })
}

const deleteItem = () => {
  list.value.splice(~~(Math.random() * list.value.length), 1)
  setTimeout(() => {
    last()
  }, 300)
}

const first = () => {
  if (!containerRefs.value) return
  const childres = containerRefs.value.children
  for (let i = 0; i < childres.length; i++) {
    const dom = childres[i] as ElementWithStartPosition
    const bcr = dom.getBoundingClientRect()
    dom.startX = bcr.left
    dom.startY = bcr.top
  }
}

const last = () => {
  if (!containerRefs.value) return
  const childres = containerRefs.value.children
  for (let i = 0; i < childres.length; i++) {
    const dom = childres[i] as ElementWithStartPosition
    const bcr = dom.getBoundingClientRect()
    const currentX = bcr.left
    const currentY = bcr.top
    invert(dom, currentX, currentY)
  }
}

const invert = (dom: ElementWithStartPosition, currentX: number, currentY: number) => {
  const translateX = dom.startX - currentX
  const translateY = dom.startY - currentY
  if (isNaN(translateX) || isNaN(translateY)) return
  play(dom, translateX, translateY)
}

const play = (dom: ElementWithStartPosition, translateX: number, translateY: number) => {
  dom.animate(
    [
      {
        transform: `translate(${translateX}px, ${translateY}px)`
      },
      {
        transform: `translate(0px, 0px)`
      }
    ],
    {
      duration: 400
    }
  )
}
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100vh;
  padding: 30px 50px 0;
  button {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  li {
    display: inline-block;
    width: 200px;
    height: 260px;
    border-radius: 4px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 16px;
    margin: 20px;
    background-color: #fff;
  }
}
</style>
