import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code
}from 'lucide-react'

export default function Toolbar({editor,content}){
    if(!editor){
        return null
    }
    return<>
        <div className='px-4 border-2'>
            
        </div>
    </>
}