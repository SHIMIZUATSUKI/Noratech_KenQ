// profile-form.tsx
"use client"
import React from 'react';
import { useForm } from 'react-hook-form'; // useForm をインポート

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from "@/components/ui/use-toast";


import createProject from './createProject'; // createProject 関数をインポート
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


// バリデーションスキーマを定義
// すでに必須とされていますが、ここで改めて確認します
const formSchema = z.object({
  project_title: z.string().min(1, "タイトルは必須です").max(40, "タイトルは40文字以内でなければなりません"),
  type: z.enum(["研究分野のヒアリング", "アドバイス・業務改善の相談（壁打ち程度）", "コンサルティング・共同研究の相談"], "カテゴリーの選択は必須です"),
  project_detail_background: z.string().min(1, "背景の説明は必須です"),
  project_detail_context: z.string().min(1, "相談内容の説明は必須です"),
});





interface IFormInput {
  project_title: string;
  type: string;
  project_detail_background: string;
  project_detail_context: string;
}






export default function ProjectForm() {
  const form = useForm<IFormInput>(); // useForm フックを使用してフォームの状態を管理、型をIFormInputに指定

  const onSubmit = async (data: IFormInput) => { // data の型を IFormInput に   

    try {
      const response = await createProject({
        project_category: data.type,
        project_title: data.project_title,
        project_detail_background: data.project_detail_background,
        project_detail_context: data.project_detail_context
      });
      console.log('Project Created:', response);
      alert('プロジェクトが作成されました！');
    } catch (error) {
      console.error('Project Creation Failed:', error);
      alert('プロジェクトの作成に失敗しました。');
    }
  };

  // フォームのレンダリング
  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>依頼のカテゴリー</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="研究分野のヒアリング" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    研究分野のヒアリング
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="アドバイス・業務改善の相談（壁打ち程度）" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    アドバイス・業務改善の相談（壁打ち程度）
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="コンサルティング・共同研究の相談" />
                    </FormControl>
                    <FormLabel className="font-normal">コンサルティング・共同研究の相談</FormLabel>
                  </FormItem>
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
    </form>
  </Form>
  );
}