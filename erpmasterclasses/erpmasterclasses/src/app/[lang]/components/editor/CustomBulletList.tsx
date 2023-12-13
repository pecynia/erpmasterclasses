import BulletList from '@tiptap/extension-bullet-list'
import { mergeAttributes } from '@tiptap/react'

const CustomBulletList = BulletList.extend({
  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes({ class: 'special-icon-list' }, HTMLAttributes), 0]
  }
})

export default CustomBulletList
