import ActionWithTooltip from '@/components/action-with-tooltip';
import { Button, buttonVariants } from '@/components/ui/button';
import { Download, Save, Trash2, Home } from 'lucide-react';
import Link from 'next/link';

function HaikuActions({
  isEmpty,
  isModified,
  isNew,
  onSave,
  onDownload,
  onOpen,
}: {
  isEmpty: boolean;
  isModified: boolean;
  isNew: boolean;
  onSave: () => void;
  onDownload: () => void;
  onOpen: () => void;
}) {
  
  return (
    <div className='flex items-center gap-2'>
      <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
        <Home className="h-5 w-5" />
      </Link>
      <ActionWithTooltip tooltip="Save Hauiku">
        <Button disabled={isEmpty} onClick={onSave} variant="outline" className='relative'>
          <Save className="w-5 h-5" />
          {isModified && <div className='h-3 w-3 rounded-full bg-red-400 absolute -top-1 -right-1' />}
        </Button>
      </ActionWithTooltip>
      <ActionWithTooltip tooltip='Export Haiku'>
        <Button disabled={isEmpty} onClick={onDownload} variant="outline">
          <Download className="w-5 h-5" />
        </Button>
      </ActionWithTooltip>
      <ActionWithTooltip tooltip="Delete Hauiku">
        <Button disabled={isNew} onClick={onOpen} variant="destructive">
          <Trash2 className="w-5 h-5" />
        </Button>
      </ActionWithTooltip>
    </div>
  );
}

export default HaikuActions;