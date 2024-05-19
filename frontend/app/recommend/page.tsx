import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 90,
      status: "pending",
      name: "赤嶺 淳",
      kana: "Akamine Jun",
      univ: "一橋大学 大学院社会学研究科",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000090336701",

    },
    {
      id: "728ed52f",
      amount: 80,
      status: "pending",
      name: "馬奈木 俊介",
      kana: "Managi Shunsuke",
      univ: "九州大学 工学研究院",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000070372456",

    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      name: "松八重 一代",
      kana: "Matsubae Kazuyo",
      univ: "東北大学 環境科学研究科",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000050374997",

    },
    {
      id: "728ed52f",
      amount: 20,
      status: "pending",
      name: "石川 登",
      kana: "Ishikawa Noboru",
      univ: "放送大学 愛知学習センター",
      position: "特任教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000020180705",

    },
    {
      id: "728ed52f",
      amount: 10,
      status: "pending",
      name: "渡部 大輔",
      kana: "Watanabe Daisuke",
      univ: "京都大学 東南アジア地域研究研究所",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000050273503",

    },
    {
      id: "728ed52f",
      amount: 10,
      status: "pending",
      name: "金本 圭一朗",
      kana: "Kanemoto Keiichiro",
      univ: "総合地球環境学研究所 研究部",
      position: "准教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000020736350",

    },
    {
      id: "728ed52f",
      amount: 80,
      status: "pending",
      name: "大野 肇",
      kana: "Ohno Hajime",
      univ: "東北大学 環境科学研究科",
      position: "准教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000020769749",

    },
    {
      id: "728ed52f",
      amount: 70,
      status: "pending",
      name: "山田 哲男",
      kana: "Yamada Tetsuo",
      univ: "電気通信大学 大学院情報理工学研究科",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000090334581",

    },
    {
      id: "728ed52f",
      amount: 50,
      status: "pending",
      name: "中島 謙一",
      kana: "Nakajima Kenichi",
      univ: "国立環境研究所 資源循環領域",
      position: "主幹研究員",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000090400457",

    },
    {
      id: "728ed52f",
      amount: 40,
      status: "pending",
      name: "野見山 敏雄",
      kana: "Nomiyama Toshio",
      univ: "東京農工大学 農学研究科",
      position: "名誉教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000020242240",

    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      name: "赤嶺 淳",
      kana: "Akamine Jun",
      univ: "一橋大学 大学院社会学研究科",
      position: "教授",
      website: "https://nrid.nii.ac.jp/ja/nrid/1000090336701",

    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
