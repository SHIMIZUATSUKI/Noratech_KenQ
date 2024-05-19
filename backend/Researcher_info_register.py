# -*- coding: utf-8 -*-
"""
Created on Sat Apr  6 13:46:24 2024
@author: tyoka
"""
import os
from db_control import crud, mymodels
import pandas as pd
from db_control.connect import engine
from mymodels import Base, Researchers,Researcher_fields,Researcher_keywords

#DB操作テスト
if __name__ == '__main__':
    #　なぜか　実行ディレクトリーが勝手にdb_controlに飛ぶので　強制的に戻す
    # スクリプトファイルのあるディレクトリの絶対パスを取得
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # 作業ディレクトリをスクリプトがあるディレクトリに変更
    os.chdir(script_dir) 
    
    #登録データ読み込み
    researcher_information = pd.read_csv("../researcher_information.csv")
    achievement_keyword = pd.read_csv("../achievement_keyword.csv")
    achievement_information = pd.read_csv("../achievement_information.csv")
    
    #必要な行だけ切り出し　もろもろ加工
    researcher_information = researcher_information[["Researcher_ID_KAKEN","ResearcherName_FullName"
                                                     ,"AffiliatedOrganization_University","Position","Researcher_URL"]]
    achievement_keyword =achievement_keyword[["Achievement_Keyword","Researcher_ID_KAKEN"]]
    achievement_information = achievement_information[["Research_Field","Researcher_ID_KAKEN"]]
    researcher_information = researcher_information.drop_duplicates(subset=['Researcher_ID_KAKEN'])
    achievement_information = achievement_information.drop_duplicates(subset=['Research_Field','Researcher_ID_KAKEN']).reset_index()
    achievement_keyword = achievement_keyword.reset_index()
    achievement_information = achievement_information.drop('index', axis=1).reset_index()
    achievement_keyword = achievement_keyword.rename(columns={'index': 'keyword_id'})
    achievement_information = achievement_information.rename(columns={'index': 'field_id'})
    achievement_keyword['keyword_id']=achievement_keyword['keyword_id']+1
    achievement_information ['field_id']=achievement_information ['field_id']+1
    
    researcher_information.rename(columns={"Researcher_ID_KAKEN":"researcher_id","ResearcherName_FullName":"researcher_name"
                                                     ,"AffiliatedOrganization_University":"affiliated_organization"
                                                     ,"Position":"position","Researcher_URL":"research_information_url"},inplace = True)
    achievement_keyword.rename(columns={"Achievement_Keyword":"achievement_keyword","Researcher_ID_KAKEN":"researcher_id"},inplace = True)
    achievement_information.rename(columns={"Research_Field":"reseach_field","Researcher_ID_KAKEN":"researcher_id"},inplace = True)
    # データベースのテーブルメタデータをリフレクト（反映）
    #Base.metadata.reflect(bind=engine)
    
    # to_sql使って　まとめて読み込む
    researcher_information.to_sql('researchers',con=engine, if_exists='replace', index=False)
    achievement_information.to_sql('researcher_fields', con=engine, if_exists='replace', index=False)
    achievement_keyword.to_sql('researcher_keywords', con=engine, if_exists='replace', index=False)
    
    key_word_list= achievement_keyword["achievement_keyword"].value_counts()
    key_word_list =   key_word_list.sort_values(ascending=False)
    key_word_list = key_word_list[:100]
    key_word_list.to_csv("key_word_list.csv")
    #1行ずつ書き込むと時間がかかる
    """
    reseacher_num = len(researcher_information)
    keyword_num = len(achievement_keyword)
    achievement_num = len(achievement_information)
    
    #研究者情報登録
    for i in range(reseacher_num):
        tmp = researcher_information.iloc[i]
        tmp_dict = tmp.to_dict()
        crud.myinsert(mymodels.Researchers, tmp_dict)
        print(i)
    
    #研究者専門分野登録
    for i in range(achievement_num):
        tmp = achievement_information.iloc[i]
        tmp_dict = tmp.to_dict()
        crud.myinsert(mymodels.Researcher_fields, tmp_dict)
        print(i)
    
    #研究者キーワード登録
    for i in range(keyword_num):
        tmp = achievement_keyword.iloc[i]
        tmp_dict = tmp.to_dict()
        crud.myinsert(mymodels.Researcher_keywords, tmp_dict)
        print(i)
    """