/**
 * Toggle de Visualização
 * Alterna entre visualização Grid e Lista
 */

'use client';

import { Grid3x3, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex self-end rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-1">
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          view === 'grid'
            ? 'bg-brand-light text-text-primary-light shadow-sm'
            : 'text-text-secondary-dark hover:bg-border-dark'
        )}
        aria-label="Visualização em grade"
      >
        <Grid3x3 className="h-4 w-4" />
        <span>Grade</span>
      </button>
      <button
        onClick={() => onChange('list')}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          view === 'list'
            ? 'bg-brand-light text-text-primary-light shadow-sm'
            : 'text-text-secondary-dark hover:bg-border-dark'
        )}
        aria-label="Visualização em lista"
      >
        <List className="h-4 w-4" />
        <span>Lista</span>
      </button>
    </div>
  );
}
