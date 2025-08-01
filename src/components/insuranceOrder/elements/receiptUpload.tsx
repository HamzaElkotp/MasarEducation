import { useRef } from "react";
import { UploadIcon } from "lucide-react"; // or any icon you prefer
import { Label } from "@/components/ui/label";
import { ReceiptFile } from "@/types/all";
import {useTranslations} from 'next-intl';

type Props = {
  receiptFile: ReceiptFile | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ReceiptFileUploadBox({ receiptFile, handleFileChange }: Props) {
  const t = useTranslations("recipUpl");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Label htmlFor="passport" className="mb-2">{t("payrecip")}</Label>

      <div
        onClick={triggerFileInput}
        className="cursor-pointer border-2 border-dashed rounded-md px-4 py-8 flex flex-col items-center justify-center text-sm text-muted-foreground hover:bg-accent transition"
      >
        <UploadIcon className="mb-2 h-6 w-6" />
        {receiptFile ? (
          <span className="text-blue-500 font-medium">{receiptFile.name}</span>
        ) : (
          <span>{t("tp")}</span>
        )}
      </div>

      <input
        ref={fileInputRef}
        id="passport"
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-xs text-muted-foreground mt-1">
        {t("acc")}
      </p>
    </div>
  );
}
