import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Link2, Link2Icon, Link2Off, Link2OffIcon, LucideLink } from "lucide-react";
import { ButtonDestructive } from "./components/Button";
import { ButtonSecondary } from "./components/Button2";



export default function Home() {
  return (
    <main>
      <div className="ps-5 pt-5 font-bold text-lg underline"><p>進行中の案件</p></div>
      <div className="grid lg:grid-cols-2 px-4 py-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cumque natus odio sed assumenda ratione? Nisi facilis quod perferendis illum, amet modi minus ullam voluptatum quidem praesentium soluta nesciunt neque!
          </CardContent>
          <div class="pl-6 flex space-x-4">
            <ButtonDestructive  />
            <ButtonSecondary  />
            </div>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cumque natus odio sed assumenda ratione? Nisi facilis quod perferendis illum, amet modi minus ullam voluptatum quidem praesentium soluta nesciunt neque!
          </CardContent>
          <div class="pl-6 flex space-x-4">
            <ButtonSecondary  />
            <ButtonSecondary  />
            </div>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>

            </div>
      <div className="ps-5 pt-5 font-bold text-lg underline"><p>募集を終了した案件</p></div>
      <div className="grid lg:grid-cols-2 px-4 py-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cumque natus odio sed assumenda ratione? Nisi facilis quod perferendis illum, amet modi minus ullam voluptatum quidem praesentium soluta nesciunt neque!
          </CardContent>
          <div class="pl-6 flex space-x-4">
            <ButtonSecondary  />
            <ButtonSecondary  />
            </div>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cumque natus odio sed assumenda ratione? Nisi facilis quod perferendis illum, amet modi minus ullam voluptatum quidem praesentium soluta nesciunt neque!
          </CardContent>
          <div class="pl-6 flex space-x-4">
            <ButtonSecondary  />
            <ButtonSecondary  />
            </div>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
        </div>
    </main>
  );
}
