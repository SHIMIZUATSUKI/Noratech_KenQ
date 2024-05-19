"use client"
import { Separator } from "@/components/ui/separator";
import ProfileForm from "./profile-form"; // Correct import statement for default export

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