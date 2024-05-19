// import { Separator } from "@/registry/new-york/ui/separator"
// import { ProfileForm } from "/profile-form"

// import { Separator } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">依頼内容</h3>
        <p className="text-sm text-muted-foreground">
          研究者に依頼したい内容をご記入ください
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
