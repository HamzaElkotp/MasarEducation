import { District } from '@/types/all';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DropdownDeleteItem from '@/components/custom/dropdown-delete-item';
import DropdownEditItem from '@/components/custom/dropdown-edit-item';

export default function DistrictItem({
  district,
  selected,
  onClick,
  onDelete,
  onRename
}: {
  district: District;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-4 rounded-md border cursor-pointer transition-all h-11 ${
        selected ? 'bg-muted' : 'hover:bg-accent'
      }`}
    >
      <span className="truncate text-sm font-normal">{district.name}</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownEditItem
            currentName={district.name}
            itemName="district"
            onEdit={onRename}
          />
          <DropdownDeleteItem onConfirm={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
