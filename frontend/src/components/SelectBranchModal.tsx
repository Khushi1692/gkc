import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Branch } from '@/types/branch';
import { fetchAllBranches } from '@/store/slices/branchSlice';

interface Props {
  open: boolean;
  onSelect: (branch: Branch) => void;
  onClose: () => void;
}

const SelectBranchModal = ({ open, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { allBranches } = useAppSelector((s) => s.branch);

  const handleConfirm = () => {
    if (!selectedId) return;
    const selectedBranch = allBranches.find((b) => b._id === selectedId);
    if (selectedBranch) {
      if (dontShowAgain) localStorage.setItem('skipSelectBranch', 'true');
      onSelect(selectedBranch);
    }
  };

  useEffect(() => {
    const savedBranchId = localStorage.getItem('selectedBranchId');
    if (savedBranchId) setSelectedId(savedBranchId);
  }, [allBranches]);

  useEffect(() => {
    if (allBranches.length === 0) {
      console.log('first');
      dispatch(fetchAllBranches({}));
    }
  }, [dispatch]);

  if (allBranches.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={handleConfirm}>
      <DialogContent className="max-w-md overflow-hidden rounded-2xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center text-xl font-semibold">
            Select Your Branch
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 pb-4">
          <div className="space-y-3">
            {allBranches?.map((branch) => (
              <button
                key={branch._id}
                onClick={() => setSelectedId(branch._id)}
                className={cn(
                  'hover:border-primary/60 hover:bg-primary/5 flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all',
                  selectedId === branch._id && 'border-primary bg-primary/10'
                )}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">{branch.name}</p>
                    {branch.address && (
                      <p className="text-muted-foreground text-sm">{branch.address}</p>
                    )}
                  </div>
                </div>
                {selectedId === branch._id && (
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-muted-foreground flex items-center space-x-2 text-sm">
            <Checkbox checked={dontShowAgain} onCheckedChange={(v) => setDontShowAgain(!!v)} />
            <span>Don’t show me again</span>
          </label>
          <Button disabled={!selectedId} onClick={handleConfirm} className="w-full sm:w-auto">
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBranchModal;
