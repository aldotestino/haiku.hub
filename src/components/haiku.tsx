'use client';

import Navbar from '@/components/navbar';
import { createHaiku, deleteHaiku, updateHaiku } from '@/server/actions';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { useState, useRef, useEffect } from 'react';
import { useDisclosure } from '@/lib/hooks';
import DeleteDialog from './delete-dialog';
import HaikuActions from './haiku-actions';
import { download } from '@/lib/utils';

interface HaikuProps {
  haiku?: {
    id: number;
    title: string;
    content: string;
  }
  isAuhenticated: boolean;
  user: KindeUser | null;
}

function Haiku({ haiku, isAuhenticated, user }: HaikuProps) {

  const [title, setTitle] = useState(haiku?.title || '');
  const [content, setContent] = useState(haiku?.content || '');
  const [isModified, setIsModified] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  /** Handle textarea auto expand */ 
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
  /**  */

  useEffect(() => {
    if(!haiku) return;
    if(title !== haiku?.title || content !== haiku?.content) {
      setIsModified(true);
    }else {
      setIsModified(false);
    }
  }, [title, content, haiku]);

  const onSave = () => {
    if(haiku?.id)
      updateHaiku({ id: haiku.id, title, content });
    else
      createHaiku({ title, content });
  };

  const onDownload = () => {
    download({ title, content });
  };

  const onDelete = () => {
    if(haiku)
      deleteHaiku({ id: haiku.id });
  };

  return (
    <div className="space-y-10">
      <Navbar isAuthenticated={isAuhenticated} user={user}>
        <HaikuActions 
          onSave={onSave} 
          onDownload={onDownload} 
          onOpen={onOpen} 
          isModified={isModified} 
          isNew={!haiku} 
          isEmpty={!title || !content} />
      </Navbar>
      <main className="space-y-8">
        <input autoFocus defaultValue={haiku?.title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" className="text-3xl font-semibold font-serif w-full outline-none" />
        <textarea ref={textareaRef} defaultValue={haiku?.content} onChange={e => setContent(e.target.value)} placeholder="Content..." className="text-2xl font-serif w-full outline-none resize-none"/> 
      </main>
      <DeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
    </div>
  );
}

export default Haiku;