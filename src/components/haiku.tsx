'use client';

import ActionWithTooltip from '@/components/action-with-tooltip';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Delete, Download, Save, Trash, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HaikuProps {
  haiku?: {
    title: string;
    content: string;
  }
}

function Haiku({ haiku }: HaikuProps) {

  const [title, setTitle] = useState(haiku?.title || '');
  const [content, setContent] = useState(haiku?.content || '');

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

  const onDownload = () => {
    const blob = new Blob([`# ${title}\n${content}`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
  };

  return (
    <div className="space-y-10">
      <Navbar>
        <div className='space-x-2'>
          <ActionWithTooltip tooltip="Save Hauiku">
            <Button disabled={!title || !content} variant="destructive">
              <Trash2 className="w-5 h-5" />
            </Button>
          </ActionWithTooltip>
          <ActionWithTooltip tooltip="Save Hauiku">
            <Button disabled={!title || !content} variant="outline">
              <Save className="w-5 h-5" />
            </Button>
          </ActionWithTooltip>
          <ActionWithTooltip tooltip='Export Haiku'>
            <Button disabled={!title || !content} onClick={onDownload} variant="outline">
              <Download className="w-5 h-5" />
            </Button>
          </ActionWithTooltip>
        </div>
      </Navbar>
      <main className="space-y-8">
        <input autoFocus value={haiku?.title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" className="text-3xl font-semibold font-serif w-full outline-none" />
        <textarea value={haiku?.content} ref={textareaRef} onChange={e => setContent(e.target.value)} placeholder="Content..." className="text-2xl font-serif w-full outline-none resize-none"/> 
      </main>
    </div>
  );
}

export default Haiku;