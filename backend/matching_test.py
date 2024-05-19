# -*- coding: utf-8 -*-
"""
Created on Sun Mar 31 14:14:24 2024

@author: tyoka
"""
import pandas as pd
import numpy as np
import openai
from db_control.connect import engine
import os

if False:
    #　なぜか　実行ディレクトリーが勝手にdb_controlに飛ぶので　強制的に戻す
    # スクリプトファイルのあるディレクトリの絶対パスを取得
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # 作業ディレクトリをスクリプトがあるディレクトリに変更
    os.chdir(script_dir) 
    
    # アクセスの為のキーをopenai.api_keyに代入し、設定
    # ここにご自身のAPIキーを入力してください！
    openai.api_key = ""
   
    # GPTに　課題文から　近いlabelを抽出してもらう
    def run_gpt(project_content,matching_labe_list,label_num):
        # リクエスト内容を決める
        request_to_gpt = project_content+"という課題/相談内容に関して  "+str(matching_labe_list)+"  というラベルの中から,意味として近いラベルを"+str(label_num)+"個選んで　, で区切り出力して下さい"
        
        # 決めた内容を元にopenai.ChatCompletion.createでchatGPTにリクエスト。オプションとしてmodelにAIモデル、messagesに内容を指定
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": request_to_gpt },
            ],
        )
    
        # 返って来たレスポンスの内容はresponse.choices[0]["message"]["content"].split()に格納されているので、これをoutput_contentに代入
        output_content = response.choices[0]["message"]["content"].split(',')
        return output_content # 返って来たレスポンスの内容を返す
    
    # 課題の分類に用いるラベルのリスト
    matching_labe_list = pd.read_csv("key_word_list.csv")
    matching_labe_list  = list(matching_labe_list.iloc[:,0])
    #matching_labe_list = matching_labe_list[:10]
    
    # 入力課題
    content_text_to_gpt = """課題名：飲料製品製造過程における環境負荷の測定   
       依頼背景:自社製品の製造・販売にかかる過程でアップサイクルの仕組を強化できないか？を検討しています。前提として環境負荷の測定を各工程で実施をしたいものの、自社内で本分野の研究機能が基礎研究分野しかなく、短期間（2-3年）で実装するにあたり、どういったアプローチで手を付ければいいか、そもそもの取っ掛かりに苦戦をしています。"
       相談内容:飲料商材など消費財の製造・販売工程における環境負荷の測定方法にはどういったアプローチがあるか？負荷軽減のための技術としてどういったものがあるか？直近のトレンドを知りたいです。また、情報収集にあたり有益な方法があれば教えていただきたいです（学会誌・学会・セミナーなど）
        """
       
    #出力ラベル数
    label_num =10
    
    #　指定数のラベルを　リスト取得
    output_label_list = run_gpt(content_text_to_gpt,matching_labe_list,label_num)
    pd.DataFrame(output_label_list).to_csv("key_word_list_select.csv")
    
if True:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # 作業ディレクトリをスクリプトがあるディレクトリに変更
    os.chdir(script_dir) 
    #後は　APIの中で　matching情報を生成する。
    keyword_list_project = list(pd.read_csv("key_word_list_select.csv")["0"])
    keyword_table = pd.read_sql_table('researcher_keywords', con=engine)
    researcher_table = pd.read_sql_table('researchers', con=engine)
    matching_table = pd.DataFrame(np.nan, index=range(len(researcher_table)),
                                  columns=["matching_id","project_id","researcher_id","matching_score","matching_status"])
    
    project_id = 1
    matching_table["project_id"]= project_id
    matching_table["matching_status"]= 0
    keyword_gp = keyword_table.groupby("Researcher_ID_KAKEN")
    
    #マッチングスコア生成、テーブル書き込み
    for i  in range(len(researcher_table)):
        matching_table.iloc[i,0]= i+1 #idを　登録
        research_id = researcher_table.iloc[i,0]
        matching_table.iloc[i,2]= research_id
        try:
            tmp_list = list(keyword_gp.get_group(research_id)["Achievement_Keyword"])
        except Exception:
            pass
        
        score = len(set(keyword_list_project)&set(tmp_list))
        matching_table.iloc[i,3]= score
        print(i)


    
