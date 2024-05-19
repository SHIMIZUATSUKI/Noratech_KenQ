"use client";
import { useEffect, useState } from 'react';
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import fetchMatching from "./fetchMatching";

export default function ReadPage(props) {
  const id = props.params.id; // URLからidを取得

  const [matchingInfo, setMatchingInfo] = useState([]); // 初期状態を空の配列に設定

  useEffect(() => {
    const fetchAndSetMatching = async () => {
      try {
        const matchingData = await fetchMatching(id); // IDに基づいてデータを取得
        setMatchingInfo(matchingData); // データを状態にセット
      } catch (error) {
        console.error("データの取得に失敗しました:", error); // エラー処理
      }
    };

    fetchAndSetMatching();
  }, [id]); // 依存配列にidを追加

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={matchingInfo} /> {/* 正しい変数名を使用 */}
    </div>
  );
}
