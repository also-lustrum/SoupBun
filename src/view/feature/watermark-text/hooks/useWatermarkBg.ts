import { computed } from 'vue'
import type { ComputedRef } from 'vue'
interface Props {
  text: string
  fontSize: number
  gap: number
}

export default function useWatermarkBg(props: Props): ComputedRef<{ base64: string; size: number; } | undefined> {
  return computed(() => {
    const canvas = document.createElement('canvas')
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontSize = props.fontSize * devicePixelRatio;
    const font = `${fontSize}px serif`;
    const ctx = canvas.getContext('2d')
    if(!ctx) return;
    ctx.font = font
    const { width } = ctx.measureText(props.text)
    const canvasSize = Math.max(100, width) + props.gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((Math.PI / 100) * -30);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(props.text, 0, 0)

    return {
      base64: canvas.toDataURL(),
      size: canvasSize / devicePixelRatio
    }
  })
}
