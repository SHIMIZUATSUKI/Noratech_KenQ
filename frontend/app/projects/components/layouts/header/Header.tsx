import Link from "next/link";
import Image from "next/image";
import React from 'react';
import Head from 'next/head';


export function Header() {
  return (
    <div className="divide-y border-gray-200 dark:border-gray-800 border-b">
      <Head>
        {/* ファビコンの設定 */}
        <link rel="icon" href="/favicon.ico" />  {/* ファビコンのパスを指定 */}
      </Head>
      <div className="px-4 py-3 md:py-6 lg:px-6">
        <div className="flex items-center space-y-2 md:space-y-0 md:space-x-6">
          {/* ロゴに変更 */}
          <Link href="/authentication" className="mr-4">
            <Image
              src="/KenQ.png"  // ロゴのパスを指定
              width={70}  // ロゴの幅を指定
              height={70}  // ロゴの高さを指定
              alt="研Q（ケンキュー）"  // 代替テキスト
            />
          </Link>
          <Link href="/authentication" className="text-xl font-bold tracking-tighter mr-4">
          研Q（ケンキュー）
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/projects"
            >
              Home
            </Link>
            <Link
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/about"
            >
              About
            </Link>
            <Link
              className="bg-black py-3 px-4 text-white rounded-md font-medium"
              href="/projects/create"
            >
              研究者に相談したい課題を登録する
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
