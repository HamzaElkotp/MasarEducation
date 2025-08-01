import { somethingWentWrong } from "@/components/notifications/toast";
import { Button } from "@/components/ui/button";
import { BankInfo } from "@/types/all";
import { InsuranceApplication } from "@/types/all";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "sonner";
import {useTranslations} from 'next-intl';
import { LuCopy } from "react-icons/lu";

type Props = {
  bankInfo: BankInfo | null;
  setBankInfo: (setBankInfo:BankInfo)=> void;
  application: InsuranceApplication;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

export default function BankInfoStep({ bankInfo, setBankInfo, application, onNext, onBack }: Props) {
  const t = useTranslations("bninfo");
  const [copied, setCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const name = `
Name
${bankInfo?.name}
`

  const bank = `
Bank
${bankInfo?.bank}
`

  const turkeyLira = `
Turkish Lira IBAN
${bankInfo?.tiban}  
`
  const dollars = `
Dollars IBAN
${bankInfo?.diban}
`
  const euros = `
Euros IBAN
${bankInfo?.eiban}
`

  const copyall = `
Name
${bankInfo?.name}

Bank
${bankInfo?.bank}

IBAN

Turkish Lira
${bankInfo?.tiban}

Dollars
${bankInfo?.diban}

Euros
${bankInfo?.eiban}
`

  const handleCopy = async (msg:string) => {
        try {
            const data = msg.trim();
            await navigator.clipboard.writeText(data).then(()=>{
                setCopied(true);
                toast.success("Copied to clipboard!");
            });
        } catch (err) {
            toast.error("Failed to copy.");
        }
  };


  useEffect(() => {
    fetch("/api/bank-info")
    .then(res => res.json())
    .then(data => {
      setBankInfo(data)
      setDisabled(false);
    })
    .catch((error)=>{
      setDisabled(true);
      somethingWentWrong("Failed to load Bank info, Please try again.");
    });
  }, [])

  if (!bankInfo) return <p>{t("load")}</p>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-zinc-900 dark:text-gray-200 p-4 rounded-md text-sm text-gray-800">
        {t("comp")}{" "}
        <span className="font-semibold text-black text-base">
          {application.price} TL
        </span>{" "}
        {t("to")}
      </div>

        <div className="space-y-2">
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Name</h3>
                    <Button variant={"ghost"} onClick={!disabled ? ()=>{handleCopy(name)} : ()=>{}} disabled={disabled}><LuCopy /></Button>
                </div>
                <p>{bankInfo.name}</p>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Bank</h3>
                    <Button variant={"ghost"} onClick={!disabled ? ()=>{handleCopy(bank)} : ()=>{}} disabled={disabled}><LuCopy /></Button>
                </div>
                <p>{bankInfo.bank}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-base font-semibold">IBAN</h3>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Turkish Lira</h3>
                        <Button variant={"ghost"} onClick={!disabled ? ()=>{handleCopy(turkeyLira)} : ()=>{}} disabled={disabled}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(bankInfo.tiban)}</p>
                </div>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Dollars</h3>
                        <Button variant={"ghost"} onClick={!disabled ? ()=>{handleCopy(dollars)} : ()=>{}} disabled={disabled}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(bankInfo.diban)}</p>
                </div>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Euros</h3>
                        <Button variant={"ghost"} onClick={!disabled ? ()=>{handleCopy(euros)} : ()=>{}} disabled={disabled}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(bankInfo.eiban)}</p>
                </div>
            </div>
            <Button variant={"outline"} onClick={!disabled ? ()=>{handleCopy(copyall)} : ()=>{}} disabled={disabled}><FaRegCopy /> {t("copy")}</Button>
        </div>
        <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />{t("Back")}</Button>
            <Button onClick={()=>{onNext()}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
        </div>
    </div>
  );
}
