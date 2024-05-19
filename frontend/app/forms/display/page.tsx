import { Separator } from "@/components/ui/separator"
import { DisplayForm } from "./display-form"
// import { DisplayForm } from "@/app/(app)/examples/forms/display/display-form"

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">依頼主の情報</h3>
        <p className="text-sm text-muted-foreground">
          相談の目的についてご記入ください
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  )
}
