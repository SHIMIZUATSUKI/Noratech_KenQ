"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // DropdownMenu関連を正しくインポート
import { MoreHorizontal } from "lucide-react"; // アイコンをインポート

export type Payment = {
  matching_id: number;
  matching_score: number;
  matching_status: number;
  researcher_name: string;
  affiliated_organization: string;
  position: string;
  research_information_url: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value); // 選択状態を切り替える
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "matching_id", // `matching_id`を追加
    header: "マッチングID",
  },
  {
    accessorKey: "researcher_name",
    header: "研究者名",
  },
  {
    accessorKey: "affiliated_organization",
    header: "所属",
  },
  {
    accessorKey: "position",
    header: "ポジション",
  },
  {
    accessorKey: "matching_score",
    header: () => <div className="text-right">マッチングスコア</div>, // スコアのカラム
    cell: ({ row }) => {
      const score = parseFloat(row.getValue("matching_score"));
      return <div className="text-right font-medium">{score.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "research_information_url",
    header: "研究者情報",
    cell: ({ row }) => (
      <a
        href={row.getValue("research_information_url")}
        target="_blank"
        rel="noopener noreferrer"
      >
        KAKEN LINK
      </a>
    ),
  },
  {
    accessorKey: "matching_status",
    header: "ステータス",
    cell: ({ row }) => <Badge>{row.getValue("matching_status")}</Badge>, // ステータス
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu> {/* エラー箇所 */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" /> {/* アイコン */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.matching_id)}
            >
              Copy matching ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Researcher Profile</DropdownMenuItem>
            <DropdownMenuItem>View Full Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
