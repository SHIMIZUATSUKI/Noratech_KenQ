# -*- coding: utf-8 -*-
"""
Created on Sat Mar 30 12:46:59 2024

@author: tyoka
"""

#from flask import Flask, request
#from flask import jsonify
#import json
#from flask_cors import CORS

from db_control import crud, mymodels

#import requests

#　依頼者データ新規登録
def create_client(values):
    generated_id = crud.myinsert(mymodels.Clients, values)
    print(generated_id)
    result = crud.myselect(mymodels.Clients, generated_id) 
    return result

#DB操作テスト
if __name__ == '__main__':
    #dummyデータ
    values = [{"client_name": "梶山"},
              {"client_name": "小柳"},
              {"client_name": "森明"},
              {"client_name": "清水"},
              {"client_name": "須賀"},
              ]
    for i  in range(len(values)):
        result = create_client(values[i])
    
    result_all = crud.myselectAll(mymodels.Clients) 
    print(result_all)