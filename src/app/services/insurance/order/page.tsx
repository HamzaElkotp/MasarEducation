import AppShell from "@/components/app-shell"
import InsuranceOrderingPage from "@/components/insuranceOrder/InsuranceOrderingManager";
import { Skeleton } from "@/components/ui/skeleton"
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
      <InsuranceOrderingPage/>
    </AppShell>
  )
}
