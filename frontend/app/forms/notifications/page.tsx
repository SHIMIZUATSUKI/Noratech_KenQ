import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "./notifications-form"
// import { NotificationsForm } from "@/app/(app)/examples/forms/notifications/notifications-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">相談方法</h3>
        <p className="text-sm text-muted-foreground">
          研究者と相談する際の条件などをご記入ください
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
