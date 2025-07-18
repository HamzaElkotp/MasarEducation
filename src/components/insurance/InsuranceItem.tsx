// components/insurance/InsuranceItem.tsx
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ConfirmDeleteDialog from "../custom/confirm-delete-dialog";
import { BiEdit, BiHide, BiShow, BiSolidHide } from "react-icons/bi";
import ConfirmActionDialog from "../custom/confirm-action-dialog";
import { IoMdPricetag } from "react-icons/io";

type Props = {
  pkg: any;
  onEdit: () => void;
  onDelete: (pkgid: number) => void;
  onToggleActive: (id: number, desiredState: boolean) => void;
};

export default function InsuranceItem({ pkg, onEdit, onDelete, onToggleActive }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-sm p-4 shadow-sm border dark:border-zinc-800 transition-colors">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {pkg.name}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Period: {pkg.period} | Time Unit: {pkg.timeUnit}
        </p>
      </div>

      <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300 h-22 overflow-y-auto pr-1">
        {pkg.prices.map((p:any, idx:any) => (
          <li key={idx} className="mb-0.5">
            <span className="inline-flex gap-1 justify-center items-center"><IoMdPricetag /> {p.minAge} – {p.maxAge} years: {p.price} TL</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between flex-wrap gap-2">
        { pkg.active && (
          <ConfirmDeleteDialog
            onConfirm={()=>{onToggleActive(pkg.id, !pkg.active)}}
            description={
              <>
                <strong className="mb-1">Are you sure you want to Deactivate this Plan?</strong>
                <span className="px-2 mb-2 block">
                  • Deactivating will cause this plan to not appear for users and they will not be able to choose this plan in future orders.
                </span>
              </>
            }
            confirmText="Deactivate This Plan"
          >
            <Button
              variant="outline"
              className="text-red-500 hover:bg-red-500 hover:text-white border border-red-500 px-4 py-2 rounded-md w-30 meow"
            > <BiHide /> Deactivate
            </Button>
          </ConfirmDeleteDialog>
        )}
        {onDelete && !pkg.active && (
          <ConfirmDeleteDialog
            onConfirm={()=>{onDelete(pkg.id)}}
            description={
              <>
                <strong className="mb-1">Are you sure you want to delete this plan?</strong>
                <span className="px-2 mb-2 block">
                  • Deleting a plan is not the best option, it may effect other components of the system like causing problem with old orders which used this plan!
                </span>
                <span className="px-2 mb-2 block">
                  • This action cannot be undone.
                </span>
                <strong>If you want to hide this plan just remain it deactivated.</strong>
              </>
            }
          >
            <Button
                variant="outline"
                className={`text-white bg-red-500 hover:bg-red-600 hover:text-white dark:text-red-500 dark:hover:text-white border border-red-500 py-2 rounded-md meow
                  ${pkg.active ? "w-15" : "w-20"}
                  `}
              ><Trash2 />
            </Button>
          </ConfirmDeleteDialog>
        )}
        {onEdit && pkg.active && (
          <Button
            variant="outline"
            onClick={onEdit}
            className="text-sm flex-1"
          ><BiEdit /> Edit Price Plan
          </Button>
        )}
        { !pkg.active && (
          <ConfirmActionDialog
            onConfirm={()=>{onToggleActive(pkg.id, !pkg.active)}}
            description={
              <>
                <strong className="mb-1">Are you sure you want to Activate this Plan?</strong>
                <span className="px-2 mb-2 block">
                  • Activating it will cause this plan to appear again for users and will allow them to choose this plan for future orders.
                </span>
              </>
            }
            confirmText="Activate This Plan"
          >
            <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white flex-1 inline-flex items-center justify-center gap-2"
              ><BiShow /> Reactivate
            </Button>
          </ConfirmActionDialog>
        )}
      </div>
    </div>
  );
}
