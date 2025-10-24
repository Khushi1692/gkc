import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface BranchConfirmationModalProps {
  open: boolean;
  nearestBranchName: string;
  selectedBranchName: string;
  onConfirm: (dontAskAgain: boolean) => void;
  onChangeBranch: (dontAskAgain: boolean) => void;
  onClose: () => void;
}

const BranchConfirmationModal = ({
  open,
  nearestBranchName,
  selectedBranchName,
  onConfirm,
  onChangeBranch,
  onClose,
}: BranchConfirmationModalProps) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Confirm Branch</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Your selected branch <strong>{selectedBranchName}</strong> is different from your
            nearest branch <strong>{nearestBranchName}</strong>.
          </p>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dontAskAgain"
              checked={dontAskAgain}
              onCheckedChange={(val) => setDontAskAgain(!!val)}
            />
            <label
              htmlFor="dontAskAgain"
              className="text-muted-foreground cursor-pointer text-sm select-none"
            >
              Don’t ask again for this combination
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onConfirm(dontAskAgain)}>
              Keep Selected
            </Button>
            <Button onClick={() => onChangeBranch(dontAskAgain)}>Switch to Nearest</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BranchConfirmationModal;
