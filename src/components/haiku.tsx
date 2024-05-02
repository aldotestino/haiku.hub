'use client';

import ActionWithTooltip from '@/components/action-with-tooltip';
import Navbar from '@/components/navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import { createHaiku, deleteHaiku, updateHaiku } from '@/server/actions';
import { Download, Save, Trash2, Home } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface HaikuProps {
  haiku?: {
    id: number;
    title: string;
    content: string;
  }
}

function Haiku({ haiku }: HaikuProps) {

  const [title, setTitle] = useState(haiku?.title || '');
  const [content, setContent] = useState(haiku?.content || '');
  const [hasUpdated, setHasUpdated] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoExpand = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto to correctly calculate scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    autoExpand();
  }, [content]);

  useEffect(() => {
    if(!haiku) return;
    if(title !== haiku?.title || content !== haiku?.content) {
      setHasUpdated(true);
    }else {
      setHasUpdated(false);
    }
  }, [title, content, haiku]);

  const onSave = () => {
    if(haiku?.id)
      updateHaiku({ id: haiku.id, title, content });
    else
      createHaiku({ title, content });
  };

  const onDownload = () => {
    const blob = new Blob([`# ${title}\n${content}`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
  };

  const onDelete = () => {
    if(haiku)
      deleteHaiku({ id: haiku.id });
  };

  return (
    <div className="space-y-10">
      <Navbar>
        <>
          <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
            <Home className="h-5 w-5" />
          </Link>
          <ActionWithTooltip tooltip="Save Hauiku">
            <Button disabled={!title || !content} onClick={onSave} variant="outline" className='relative'>
              <Save className="w-5 h-5" />
              {hasUpdated && <div className='h-3 w-3 rounded-full bg-red-400 absolute -top-1 -right-1' />}
            </Button>
          </ActionWithTooltip>
          <ActionWithTooltip tooltip='Export Haiku'>
            <Button disabled={!title || !content} onClick={onDownload} variant="outline">
              <Download className="w-5 h-5" />
            </Button>
          </ActionWithTooltip>
          <ActionWithTooltip tooltip="Delete Hauiku">
            <Button disabled={!title || !content || !haiku} onClick={onDelete} variant="destructive">
              <Trash2 className="w-5 h-5" />
            </Button>
          </ActionWithTooltip>
        </>
      </Navbar>
      <main className="space-y-8">
        <input autoFocus defaultValue={haiku?.title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" className="text-3xl font-semibold font-serif w-full outline-none" />
        <textarea ref={textareaRef} defaultValue={haiku?.content} onChange={e => setContent(e.target.value)} placeholder="Content..." className="text-2xl font-serif w-full outline-none resize-none"/> 
      </main>
    </div>
  );
}

export default Haiku;