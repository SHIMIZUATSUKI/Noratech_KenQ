import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"
// import { AccountForm } from "@/app/(app)/examples/forms/account/account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">募集要項</h3>
        <p className="text-sm text-muted-foreground">
          お会いしたい研究者の属性についてご記入ください
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
