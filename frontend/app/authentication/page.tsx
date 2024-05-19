import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={1200}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={1200}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          ログイン（課題を投稿する/投稿した課題の進捗を確認する）
        </Link>

        {/* 左画面にロゴを追加 */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gray-800" />
          <div className="relative z-20 flex items-center justify-center text-lg font-medium h-full flex-col">
            {/* 白い背景のコンテナ */}
            <div className="bg-white p-3 rounded">
              <Image
                src="/KenQ.png"  // ロゴの画像パス
                width={90}  // ロゴの幅
                height={90}  // ロゴの高さ
                alt="Company Logo"  // ロゴの代替テキスト
              />
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-2 h-6 w-6"
            >
              {/* <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" /> */}
            </svg>

            研Q（ケンキュー）
          </div>
       
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The greatest creative capacity exists in crossing traditional domain boundaries.&rdquo;
                &ldquo;創造性の大部分は伝統領域の境界を超えることにある&rdquo;
              </p>
              <footer className="text-sm">Mihaly Csikszentmihalyi（ミハイ・チクセントミハイ）</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                アカウントを作成する
              </h1>
              <p className="text-sm text-muted-foreground">
                初めてご利用の方はアカウントを作成してください
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              続行することで{" "}
              <span className="inline-block">
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">利用規約</Link>{" "}と</span>
                <span className="inline-block">
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">プライバシーポリシー</Link></span>
                に同意します
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
