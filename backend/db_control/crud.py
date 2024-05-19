# uname() error回避
import platform
print("platform", platform.uname())
 

from sqlalchemy import create_engine, insert, delete, update, select
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import json
import pandas as pd

from db_control.connect import engine
 

def myinsert(mymodel, values):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    query = insert(mymodel).values(values)
    try:
        # トランザクションを開始
        with session.begin():
            # データの挿入
            result = session.execute(query)
            generated_id = result.inserted_primary_key[0]
    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        session.rollback()
 
    # セッションを閉じる
    session.close()
    return generated_id






 
def myselect(mymodel,target_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    
    query = session.query(mymodel).filter(mymodel.project_id == target_id)
    
    try:
        # トランザクションを開始
        with session.begin():
            #result = query.one()
            result = query.one()
        # 結果をオブジェクトから辞書に変換し、リストに追加
        result_dict = {
            "project_title" : result.project_title,
            "project_category" : result.project_category,
            "project_detail_background" : result.project_detail_background,
            "project_detail_context" : result.project_detail_context,
            "project_proposal_contents" : result.project_proposal_contents,
            "project_proposal_researcher" : result.project_proposal_researcher,
            "research_field_major_classification"  : result.research_field_major_classification,
            "research_field_subclassification" : result.research_field_subclassification,
            "client_goal_category" : result.client_goal_category,
            "client_industry" : result.client_industry,
            "consultation_method" : result.consultation_method,
            "time_required" : result.time_required,
            "reward_fee" : result.reward_fee,
            "deadline_date" : result.deadline_date,
            "release" : result.release
            }
        """
        result_dict_list = []
        for project_info in result:
            result_dict_list.append({
                "project_id": project.project_id,
                "client_name": client_info.client_name,
            })
        """
        # リストをJSONに変換
        result_json = json.dumps(result_dict, ensure_ascii=False)
    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")

    # セッションを閉じる
    session.close()
    return result_json


def myselectAll(mymodel):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    query = select(mymodel)
    try:
        # トランザクションを開始
        with session.begin():
            df = pd.read_sql_query(query, con=engine)
            df = df.iloc[:,:2]
            result_json = df.to_json(orient='records',force_ascii=False)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    # セッションを閉じる
    session.close()
    return result_json

def myupdate(mymodel, values):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    client_id = values.pop("client_id")
 
    query = "お見事！E0002の原因はこのクエリの実装ミスです。正しく実装しましょう"
    try:
        # トランザクションを開始
        with session.begin():
            result = session.execute(query)
    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        session.rollback()
    # セッションを閉じる
    session.close()
    return "put"

def mydelete(mymodel, client_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    query = delete(mymodel).where(mymodel.customer_id==customer_id)
    try:
        # トランザクションを開始
        with session.begin():
            result = session.execute(query)
    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        session.rollback()
 
    # セッションを閉じる
    session.close()
    return client_id + " is deleted"