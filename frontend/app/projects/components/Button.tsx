/* import { Button } from "@/components/ui/button"
 
export function ButtonDestructive() {
  return <Button variant="destructive">マッチング結果を見る</Button>
} */


// components/ButtonDestructive.jsx


// components/Button.tsx
"use client";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export function ButtonDestructive({ projectId }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault(); // リンクのデフォルトの動作を阻止
    router.push(`/projects/read/${projectId}/matching`);
  };

  return (
    <Button variant="destructive" onClick={handleClick}>
      マッチング結果を見る
    </Button>
  );
}


