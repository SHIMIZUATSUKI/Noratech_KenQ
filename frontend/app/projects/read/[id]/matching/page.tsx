"use client";
import { useEffect, useState } from 'react';
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import fetchMatching from "./fetchMatching";
import updateMatching from "./updateMatching";
import { Button } from "@/components/ui/button"; // ボタンのインポート

export default function ReadPage(props) {
  const id = props.params.id; // URLからIDを取得

  const [matchingInfo, setMatchingInfo] = useState<Payment[]>([]); // 初期状態を空の配列に設定
  const [selectedMatchingIds, setSelectedMatchingIds] = useState<string[]>([]); // 選択されたIDの追跡

  useEffect(() => {
    const fetchAndSetMatching = async () => {
      try {
        const matchingData = await fetchMatching(id); // データを取得
        setMatchingInfo(matchingData); // データを状態にセット
      } catch (error) {
        console.error("データの取得に失敗しました:", error); // エラー処理
      }
    };

    fetchAndSetMatching(); // データの取得
  }, [id]); // IDの変更に応じて再取得

  // 行選択の追跡
  const handleRowSelectionChange = (rowSelection) => {
    const selectedIds = Object.keys(rowSelection).map((rowId) => {
      return rowId; // 選択されたIDを取得
    });
    setSelectedMatchingIds(selectedIds); // 状態にセット
  };

  // オファーを送信
  const handleSendOffer = async () => {
    console.log("Selected Matching IDs:", selectedMatchingIds); // デバッグ用
    if (selectedMatchingIds.length === 0) {
      alert('オファーしました'); // 選択されていない場合
/*       alert('少なくとも1つのマッチングIDを選択してください。'); // 選択されていない場合
 */      return;
    }

    const formData = new FormData(); // フォームデータを作成
    selectedMatchingIds.forEach((id) => {
      formData.append("matching_id", id); // `matching_id`を追加
    });

    try {
      await updateMatching(formData); // PUTリクエストを送信
      alert('マッチングステータスが正常に変更されました！'); // 成功時のメッセージ
    } catch (error) {
      console.error('オファーの送信に失敗しました:', error); // エラー処理
      alert('オファーの送信に失敗しました。');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={matchingInfo}
        onRowSelectionChange={handleRowSelectionChange} // 行選択の変更を追跡
      />
      <Button onClick={handleSendOffer}>オファーする</Button> {/* ボタン */}
    </div>
  );
}
