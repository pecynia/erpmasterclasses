
import { Editor } from '@tiptap/react'
import { Button } from '@/app/[lang]/components/ui/button'
import { 
    Bold,
    Italic,
    Strikethrough,
    RemoveFormatting,
    Pilcrow,
    SeparatorHorizontal,
    Space,
    Quote,
    Heading1,
    Heading2,
    Heading3,
    ListOrdered,
    Undo,
    Redo,
    List,
    Eraser,
    Link,
    Anchor,
    Palette,
    CheckCheckIcon,
    ListChecks,
 } from 'lucide-react'
import { Separator } from '@/app/[lang]/components/ui/separator'
import { hslToHex } from '@/lib/utils/hexToHsl'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null
    return (
        <div className='sticky -mt-32 z-10 bg-white shadow-lg rounded-xl'>
            <div className='flex flex-wrap items-center px-4 py-2 space-x-1 gap-2'>
                <Button variant='ghost' size='sm'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={editor.isActive('bold') ? 'bg-secondary text-white' : ''}
                >
                    <Bold className='w-4 h-4' />
                </Button>

                <Button variant='ghost' size='sm'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className={editor.isActive('italic') ? 'bg-secondary' : ''}
                >
                    <Italic className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm'
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className={editor.isActive('strike') ? 'bg-secondary' : ''}
                >
                    <Strikethrough className='w-4 h-4' />
                </Button>
                {/* Text colours */}
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().setColor(hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary'))).run()}
                    className={editor.isActive('textStyle', { color: 'secondary' }) ? 'bg-secondary' : ''}
                >
                    <div className='bg-primary rounded-full w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().setColor(hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary'))).run()}
                    className={editor.isActive('textStyle', { color: 'secondary' }) ? 'bg-secondary' : ''}
                >
                    <div className='bg-secondary rounded-full w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().setColor(hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--secondary-foreground'))).run()}
                    className={editor.isActive('textStyle', { color: 'secondary' }) ? 'bg-secondary' : ''}
                >
                    <div className='bg-secondary-foreground rounded-full w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary' : ''}
                >
                    <Heading1 className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary' : ''}
                >
                    <Heading2 className='w-4 h-4' />
                </Button>
                <Button variant='ghost'  size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary' : ''}
                >
                    <Heading3 className='w-4 h-4' />    
                </Button>
                <Button variant='ghost' size='sm'
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormatting className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm" onClick={() => editor.chain().focus().clearNodes().run()}>
                    <Eraser className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'bg-secondary' : ''}
                >
                    <Pilcrow className='w-4 h-4' />
                </Button>
                
                </div>
                <Separator orientation='vertical' />
            <div className='flex flex-wrap items-center px-4 py-2 space-x-1'>
                {/* <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
                    >
                    <List className='w-5 h-5' />
                </Button> */}
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
                >
                    <ListChecks className='w-5 h-5' />
                </Button>

                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
                >
                    <ListOrdered className='w-5 h-5' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-secondary' : ''}
                >
                    <Quote className='w-3 h-3' />
                </Button>
                <Button variant='ghost' size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <SeparatorHorizontal className='w-4 h-4' />
                </Button >
                <Button variant='ghost' size="sm" onClick={() => editor.chain().focus().setHardBreak().run()}>
                    <Space className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                    }
                >
                    <Undo className='w-6 h-6' />
                </Button>
                <Button variant='ghost' size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                    }
                >
                    <Redo className='w-6 h-6' />
                </Button>
            </div>
        </div>
    )
}

export default MenuBar