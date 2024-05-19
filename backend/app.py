from flask import Flask, request
from flask import jsonify
import json
from flask_cors import CORS
from db_control import crud, mymodels
import requests
import pandas as pd
#import unittest
import os
#from datetime import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir) 
from matching import matchig_table_create, matchig_recommend,matchig_status_update,matchig_offer,matchig_researcher_info

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "<p>Noratech top page!</p>"

#フロー番号:0
@app.route("/allprojects", methods=['GET']) # type: ignore
def read_all_projects():
    model = mymodels.Projects
    result = crud.myselectAll(mymodels.Projects)
    return result, 200

#フロー番号:2
@app.route("/projects", methods=['POST'])
def create_projects():
    values = request.get_json()
    print(values)
    if not values:
        response = {
            'message': 'create_project failed'}
        return response, 400

    # プロジェクト情報をデータベースに登録
    try:
        project_id = crud.myinsert(mymodels.Projects, values)
        return {"project_id": project_id} ,200
    except Exception as e:
        response = {
            'message': 'failed to create project'}
        return response, 500
    
#フロー番号:3
@app.route("/projects", methods=['GET'])
def read_one_projects():
    #model = mymodels.Projects
    target_id = int(request.args.get('project_id')) #クエリパラメータ
    result = crud.myselect(mymodels.Projects, target_id)
    return result, 200

"""
#フロー番号：14 とりあえず保留
@app.route("/projects", methods=['PUT'])
def update_project():
    values = request.get_json()
    if not values:
        return jsonify({"error": "リクエストボディが空です"}), 400
    
    # リクエストからプロジェクトIDを取得。実際のアプリケーションでは、プロジェクトIDはURLから取得することが多いですが、
    # ここではリクエストボディから取得すると仮定します。
    project_id = values.get("project_id")
    if not project_id:
        return jsonify({"error": "プロジェクトIDが指定されていません"}), 400

    try:
        # データベースを更新する処理。crud.myupdateは仮定の関数で、実際の関数名や使い方は使用しているORMによって異なります。
        # ここでは、更新対象のモデル、更新するレコードの識別子、そして更新内容を渡しています。
        success = crud.myupdate(mymodels.Projects, project_id, values)
        if success:
            return jsonify({"message": "修正完了しました"}), 200
        else:
            # 更新が行われなかった場合（例えば、指定されたIDが存在しないなど）
            return jsonify({"error": "プロジェクトの更新に失敗しました"}), 404
    except Exception as e:
        # 更新処理中に何らかのエラーが発生した場合
        return jsonify({"error": "内部サーバーエラー", "detail": str(e)}), 500
"""

#フロー番号:4
@app.route("/matching", methods=['POST'])
def create_matching():
    project_id = int(request.args.get('project_id')) #クエリパラメータ

    # 課題の分類に用いるラベルのリスト
    matching_labe_list = pd.read_csv("key_word_list.csv")
    matching_labe_list  = list(matching_labe_list.iloc[:,0])
    #マッチングテーブル作成,登録
    matchig_table_create(project_id,matching_labe_list)
    
    response = {
        'message': 'Matching created successfully'}
    # 成功のレスポンスを返す
    return response, 200

#フロー番号:5
@app.route("/matching", methods=['GET'])
def get_project_matching():
    # クエリパラメータからproject_idを取得
    project_id = int(request.args.get('project_id')) #クエリパラメータ
       
    if not project_id:
        # project_idが指定されていない場合はエラーを返す
        response = {
            'message': 'failed to get project_id'}
        return  response, 400
    
    #レコメンドの　matchin_id　データのみ取り出す
    result = matchig_recommend(project_id) 
    return result, 200

#フロー番号:7,10
@app.route("/matching/offer", methods=['GET'])
def get_project_matching_offer():
    # クエリパラメータからproject_idを取得
    project_id = int(request.args.get('project_id'))
    
    if not project_id:
        # project_idが指定されていない場合はエラーを返す
        response = {
            'message': 'failed to get project_id'}
        return  response, 400
    
    #オファー済の　matchin_id　データのみ取り出す
    result = matchig_offer(project_id)
    
    return result, 200

#フロー番号:6
@app.route("/matching", methods=['PUT'])
def update_matching_status():

    matching_id_list = request.args.getlist('matching_id')
    matching_id_list = [int(id) for id in matching_id_list if id.isdigit()]
    
    if not matching_id_list:
        # matching_idが指定されていない場合はエラーを返す
        response = {
            'message': 'failed to get matching_id'}
        return  response, 400

    matchig_status_update(matching_id_list,1)
    
    response = {
        'message': 'Matching status changed successfully'}
    # 成功のレスポンスを返す
    return response, 200


#フロー番号:9
@app.route("/matching/offer", methods=['PUT'])
def update_matching_status_offer():

    matching_id = request.args.get('matching_id')
    if not matching_id:
        # matching_idが指定されていない場合はエラーを返す
        response = {
            'message': 'failed to get matching_id'}
        return  response, 400

    matchig_status_update(matching_id,4)

    response = {
        'message': 'Matching status changed successfully'}
    # 成功のレスポンスを返す
    return response, 200

#フロー番号:8
@app.route("/reseacher", methods=['GET'])
def get_researcher_info():
    # クエリパラメータからproject_idを取得
    matching_id = request.args.get('matching_id')
    
    if not matching_id:
        # project_idが指定されていない場合はエラーを返す
        return  400
    
    result= matchig_researcher_info(matching_id)
    
    return result, 200
""" 
##############　ユニットテスト用のコード　###################


 if  True:

    #フロー 2 テスト
    class ProjectAPITestCase_2(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
            
        def test_create_project_success(self):
            # 正常なデータでプロジェクトを作成するテスト
            data = {
                "project_category": "2. アドバイス・業務改善の相談(壁打ち程度)",
                "project_title": "飲料製品製造過程における環境負荷の測定",
                "project_detail_background": "自社製品の製造・販売にかかる過程でアップサイクルの仕組を強化できないか？を検討しています。前提として環境負荷の測定を各工程で実施をしたいものの、自社内で本分野の研究機能が基礎研究分野しかなく、短期間（2-3年）で実装するにあたり、どういったアプローチで手を付ければいいか、そもそもの取っ掛かりに苦戦をしています。",
                "project_detail_context": "飲料商材など消費財の製造・販売工程における環境負荷の測定方法にはどういったアプローチがあるか？負荷軽減のための技術としてどういったものがあるか？直近のトレンドを知りたいです。また、情報収集にあたり有益な方法があれば教えていただきたいです（学会誌・学会・セミナーなど）",
                "project_proposal_contents": "環境負荷測定にあたりご説明いただけるアプローチ方法の種類、本テーマにおいてご自身がどういった研究をされているか、ご記載ください。",
                "project_proposal_researcher": "環境負荷軽減の領域における研究実績がある方",
                "research_field_major_classification": "環境・農学",
                "research_field_subclassification": "環境影響評価 ",
                "client_goal_category": "1. 自社の事業・業務改善のため",
                "client_industry": "食品業界",
                "consultation_method": "1.電話・Web会議",
                "time_required": 60,
                "reward_fee": 50000,
                "deadline_date": "2024/05/31",
                "release": "公開"
                }
                
            response = self.client.post('/projects', data=json.dumps(data), content_type='application/json')
            self.assertEqual(response.status_code, 200)
                # 返されたproject_idの検証など、その他のアサーションを追加します
    
            # JSONレスポンスをロードしてproject_idを取得
            json_data = json.loads(response.data)
            project_id = json_data.get('project_id')
            print(project_id)

if  False:
    #フロー 3 テスト
    class ProjectAPITestCase_3(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
            
        def test_read_one_projects_success(self):           
            response = self.client.get('/projects', query_string={'project_id': 1})
            self.assertEqual(response.status_code, 200)
    
            # JSONレスポンスをロードしてproject_data を取得
            json_data = json.loads(response.data)
            print(json_data)

if  False:
    #フロー 4 テスト
    class ProjectAPITestCase_4(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_create_matching_success(self):
            response = self.client.post('/matching', query_string={'project_id':1})
            self.assertEqual(response.status_code, 200)
            
if False:
    #フロー 5 テスト
    class ProjectAPITestCase_5(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_get_project_matching_success(self):
            response = self.client.get('/matching', query_string={'project_id':1})
            # JSONレスポンスをロードしてmatching_id を取得
            json_data = json.loads(response.data)
            print(json_data)

if True:



    #フロー 6 テスト
    class ProjectAPITestCase_6(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_update_matching_status_success(self):
            response = self.client.put('/matching', query_string={'matching_id': [1,2,3,4,5]})
            self.assertEqual(response.status_code, 200)

if False:
    #フロー 7 テスト
    class ProjectAPITestCase_7(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_get_project_matching_offer_success(self):
            response = self.client.get('/matching/offer', query_string={'project_id':1})
            # JSONレスポンスをロードしてmatching_id を取得
            json_data = json.loads(response.data)
            print(json_data)

if False:
    #フロー 9 テスト
    class ProjectAPITestCase_9(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_update_matching_status_success(self):
            response = self.client.put('/matching/offer', query_string={'matching_id': 1})
            self.assertEqual(response.status_code, 200)

if False:
    #フロー0  テスト
    class ProjectAPITestCase_0(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
            
        def test_read_one_projects_success(self):           
            response = self.client.get('/allprojects')
            self.assertEqual(response.status_code, 200)
    
            # JSONレスポンスをロードしてproject_data を取得
            json_data = response.data
            print(json_data)

if False:

    #フロー 8 テスト
    class ProjectAPITestCase_8(unittest.TestCase):
        def setUp(self):
            self.client = app.test_client()
            # テスト用のデータベースを設定します
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Noratech.db'
        
        def test_get_researcher_info_success(self):
            response = self.client.get('/reseacher', query_string={'matching_id': 1})
            self.assertEqual(response.status_code, 200)
            json_data = json.loads(response.data)
            print(json_data)


if __name__ == '__main__':
    # スクリプトファイルのあるディレクトリの絶対パスを取得
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # 作業ディレクトリをスクリプトがあるディレクトリに変更
    os.chdir(script_dir) 
    
    unittest.main() """ 