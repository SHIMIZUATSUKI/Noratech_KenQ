# -*- coding: utf-8 -*-
"""
Created on Wed Apr 10 21:06:14 2024

@author: tyoka
"""

import pandas as pd
import numpy as np
import openai
from db_control.connect import engine
from sqlalchemy.orm import sessionmaker
from db_control import mymodels
import json
import os
from dotenv import load_dotenv

def run_gpt(project_content,matching_labe_list,label_num):
    # リクエスト内容を決める
    request_to_gpt = project_content+"という課題/相談内容に関して  "+str(matching_labe_list)+"  というラベルの中から,意味として近いラベルを"+str(label_num)+"個選んで　「,」　の文字で必ず区切り出力して下さい"
    
    # 決めた内容を元にopenai.ChatCompletion.createでchatGPTにリクエスト。オプションとしてmodelにAIモデル、messagesに内容を指定
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": request_to_gpt },
        ],
    )

    # 返って来たレスポンスの内容はresponse.choices[0]["message"]["content"].split()に格納されているので、これをoutput_contentに代入
    output_content = response.choices[0]["message"]["content"]
    
    if "," in output_content:
        output_content = output_content.split(",")
    elif "、" in output_content:
        output_content = output_content.split("、")
        
    return output_content # 返って来たレスポンスの内容を返す


def matchig_table_create(project_id,matching_labe_list):
    
    # ここにご自身のAPIキーを入力してください！

    openai.api_key = os.getenv('OPENAI_API_KEY')
    
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    query = session.query(mymodels.Projects).filter(mymodels.Projects.project_id == project_id)
    
    with session.begin():
        result = query.one()
    
    # 入力課題
    content_text_to_gpt = "課題名："+ result.project_title + "  ,依頼背景: "+result.project_detail_background+ "  ,相談内容:" + result.project_detail_context
    
    #出力ラベル数
    label_num =10
    
    #　指定数のラベルを　リスト取得
    output_label_list = run_gpt(content_text_to_gpt,matching_labe_list,label_num)
    #キーワードの前後に　空白文字が入ってる場合は　削除
    output_label_list = [item.strip() for item in output_label_list]
    
    #各テーブルを　dfに読み込み
    keyword_table = pd.read_sql_table('researcher_keywords', con=engine)
    researcher_table = pd.read_sql_table('researchers', con=engine)
    matching_table = pd.DataFrame(np.nan, index=range(len(researcher_table)),
                                  columns=["matching_id","project_id","researcher_id","matching_score","matching_status","researcher_proposal"])
    
    matching_table["project_id"]= project_id
    matching_table["matching_status"]= 0
    matching_table["researcher_proposal"]= "0"
    keyword_gp = keyword_table.groupby("researcher_id") #研究者毎に保持する keywordを　グループ化する
    
    #マッチングスコア生成、テーブル書き込み
    for i  in range(len(researcher_table)):
        matching_table.iloc[i,0]= i+1 #idを　登録
        research_id = researcher_table.iloc[i,0]
        matching_table.iloc[i,2]= research_id
        #print(i)
        try:
            tmp_list = list(keyword_gp.get_group(research_id)["achievement_keyword"])
            #print(tmp_list)
        except Exception:
            pass
        
        score = len(set(output_label_list)&set(tmp_list))
        matching_table.iloc[i,3]= score
    
    #Table　生成時に　　int型になるべき　id系のデータ　が　floatになっているので　int　変換
    matching_table['matching_id'] = matching_table['matching_id'].astype(int)
    matching_table['researcher_id'] = matching_table['researcher_id'].astype(int)
    #matching_table['project_id'] = matching_table['project_id'].astype(int)
    matching_table['matching_status'] = matching_table['matching_status'].astype(int)
    #dfを　DBに書き込む
    matching_table.to_sql('matchings',con=engine, if_exists='replace', index=False)
    
    return "matching completed"

def matchig_recommend(project_id):
    
    #作成した　matching_tableを読み込み　スコアが高い順に並べる
    matching_table = pd.read_sql_table('matchings', con=engine)
    matching_table = matching_table[matching_table["project_id"]==project_id]
    matching_table =  matching_table.sort_values(by="matching_score", ascending= False)
    
    #スコア上位10のデータを取り出す
    recommend_table = matching_table[:10]
    
    #研究者テーブル呼び出し、matching データに必要列をmergeする
    researcher_table = pd.read_sql_table('researchers', con=engine)
    recommend_table = pd.merge(recommend_table,researcher_table,on="researcher_id",how="left")
    recommend_table = recommend_table.drop_duplicates(subset=["researcher_id"])
    recommend_table = recommend_table.drop(["project_id","researcher_id"], axis=1)
    
    #return用に　DataFrame→jsonに変換
    result =   recommend_table.to_json(orient='records')
    
    return result

def matchig_offer(project_id):
    
    matching_table = pd.read_sql_table('matchings', con=engine)
    matching_table = matching_table[matching_table["project_id"]==project_id]
    offer_table = matching_table[matching_table["matching_status"]>=1] #オファー済のデータのみ取り出す
    
    #研究者テーブル呼び出してマージ
    researcher_table = pd.read_sql_table('researchers', con=engine)
    offer_table = pd.merge(offer_table,researcher_table,on="researcher_id",how="left")
    offer_table = offer_table.drop(["project_id","researcher_id"], axis=1)
    
    #return用に　DataFrame→jsonに変換
    result =   offer_table.to_json(orient='records')
    
    return result

def matchig_status_update(matching_id_list,flg):
    
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    
    #オファーが出た時点で　matching_statsuを　1以外にも書き換えてしまう
    status_list = [2,1,3,2,1,3,2,1,3,2]
    #オファーする時
    if flg ==1:
        # オファーした　matching_id の　status　を1 に書き換える
        i=0
        for matching_id in matching_id_list:
            matching_data = session.query(mymodels.Matchings).filter(mymodels.Matchings.matching_id == matching_id).first()
            matching_data.matching_status = status_list[i]
            session.commit()  # 変更をコミット
            i=i+1
        
    #リクエストするとき    
    elif flg==4:
        # オファーした　matching_id の　status　を1 に書き換える

        # オファーは　複数同時にできる　か？と思ったが　現状の仕様だと　受け取るのは 単一idなので matching_id_listといいつつ　intとして処理する

        matching_id = matching_id_list
        matching_data = session.query(mymodels.Matchings).filter(mymodels.Matchings.matching_id == matching_id).first()
        matching_data.matching_status = 4
        session.commit()  # 変更をコミット
    
    return "matching status changed"
     
def matchig_researcher_info(matching_id):
    
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    
    query1 = session.query(mymodels.Matchings).filter(mymodels.Matchings.matching_id == matching_id)
    
    with session.begin():
        matching_data = query1.one()
        
        researcher_id = matching_data.researcher_id

        #matching_idに該当する　研究者情報を取り出す

        query2 = session.query(mymodels.Researchers).filter(mymodels.Researchers.researcher_id == researcher_id)
        researcher_data = query2.one()
        
        #必要情報のみの　dictを作成
        result_dict = {
            "matching_score" : matching_data.matching_score,
            "researcher_proposal" : matching_data.researcher_proposal,
            "researcher_name" : researcher_data.researcher_name,
            "affiliated_organization" : researcher_data.affiliated_organization,
            "position" : researcher_data.position,
            "research_information_url" : researcher_data.research_information_url
            }
        
        result_json = json.dumps(result_dict, ensure_ascii=False)
    
        # セッションを閉じる
        session.close()
        return result_json    
    
    