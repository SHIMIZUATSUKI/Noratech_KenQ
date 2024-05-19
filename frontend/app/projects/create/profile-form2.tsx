// profile-form.tsx
"use client"
import createProject from "./createProject"; // 正しいパスに変更してください
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form';
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// フォームバリデーションスキーマの設定
const profileFormSchema = z.object({
  project_title: z.string().max(40, { message: "案件のタイトルは40文字以内で入力ください" }),
  project_category: z.enum(["research", "advice", "consulting"]),
  project_detail_background: z.string().max(800),
  project_detail_context: z.string().max(800),
});

// フォームの型定義
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {

}

export function ProfileForm() {
  // useFormフックの使用
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // フォーム送信時の処理
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // createProject関数でFlaskへPOSTリクエストを送信
      await createProject({
        project_category: data.project_category,
        project_title: data.project_title,
        project_detail_background: data.project_detail_background,
        project_detail_context: data.project_detail_context,
      });
      // 成功時のトースト表示
      toast({ title: "プロジェクトを作成しました。", status: "success" });
    } catch (error) {
      // エラー時のトースト表示
      toast({ title: "プロジェクトの作成に失敗しました。", status: "error" });
    }
  };

  // フォームのレンダリング
  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="project_title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>案件のタイトル（40文字以内）</FormLabel>
            <FormControl>
              <Input placeholder="タイトル名を記載してください" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="project_category"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>依頼のカテゴリー</FormLabel>
            <FormControl>
              <RadioGroup {...field} className="flex flex-col space-y-1">
                <RadioGroupItem value="research">研究分野のヒアリング</RadioGroupItem>
                <RadioGroupItem value="advice">アドバイス・業務改善の相談（壁打ち程度）</RadioGroupItem>
                <RadioGroupItem value="consulting">コンサルティング・共同研究の相談</RadioGroupItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="project_detail_background"
        render={({ field }) => (
          <FormItem>
            <FormLabel>依頼背景</FormLabel>
            <FormControl>
              <Textarea placeholder="案件の背景を記載してください。状況や課題、依頼したい理由などを記入しましょう。" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="project_detail_context"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ミーティング時に相談したいこと</FormLabel>
            <FormControl>
              <Textarea placeholder="具体的な相談内容を記載してください。" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">登録する</Button>
    </Form>
  );
}

