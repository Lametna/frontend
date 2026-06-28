import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon: Icon = Ghost, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6 shadow-inner">
        <Icon className="w-10 h-10 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-xl px-8 shadow-md">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
