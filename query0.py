from neo4j import GraphDatabase, basic_auth
import pandas as pd

#ノード追加

#session = driver.session()

file_path_process4 = ['../../data/search_textdata_temp/電気事業法.csv','../../data/search_textdata_temp/電気事業法施行令.csv','../../data/search_textdata_temp/電気事業法施行規則.csv','../../data/search_textdata_temp/発電用火力設備に関する技術基準を定める省令.csv','../../data/search_textdata_temp/電気事業法施⾏規則に基づく溶接事業者検査（⽕⼒設備）の解釈.csv','../../data/search_textdata_temp/電気事業法第52条に基づく⽕⼒設備に対する溶接事業者検査ガイド.csv','../../data/search_textdata_temp/⽕⼒発電所溶接事業者検査⼿引き.csv','../../data/search_textdata_temp/発電用火力設備の技術基準省令及び解釈 ［第10章 溶接部］[解 説].csv','../../data/search_textdata_temp/発電⽤⽕⼒設備の技術基準の解釈.csv']

for n in range (len(file_path_process4)):
    #文書の名称を代入
    all_list = pd.read_csv(file_path_process4[n])
    if n==0:
        bunsyo = '電気事業法'
    elif n==1:
        bunsyo = '電気事業法施行令'
    elif n==2:
        bunsyo = '電気事業法施行規則'
    elif n==3:
        bunsyo = '発電用火力設備に関する技術基準を定める省令'
    elif n==4:
        bunsyo = '電気事業法施⾏規則に基づく溶接事業者検査（⽕⼒設備）の解釈'
    elif n==5:
        bunsyo = '電気事業法第52条に基づく⽕⼒設備に対する溶接事業者検査ガイド'
    elif n==6:
        bunsyo = '⽕⼒発電所溶接事業者検査⼿引き'
    elif n==7:
        bunsyo = '発電用火力設備の技術基準省令及び解釈 ［第10章 溶接部］[解 説]'
    elif n==8:
        bunsyo = '発電⽤⽕⼒設備の技術基準の解釈'

    #文章の名称を読み込み
    id_list = all_list['id']
    sentence_list = all_list['Sentence']
    konkyo_list = all_list['根拠_id']
    hosoku_list = all_list['補足_id']
    sentence_morpho_list = all_list['sentence_morpho']
    num = len(all_list['id'])

    try:
        zyo_list = all_list['ArticleTitle']
    except:
        zyo_list = ['なし']* num
    try:
        try:
            syo_list = all_list['ChapterTitle']
        except:
            syo_list = all_list['章']
    except:
        syo_list = ['なし']* num
    try:
        try:
            syo_name_list = all_list['ArticleCaption']
        except:
            syo_name_list = all_list['章の名称']
    except:
        syo_name_list = ['なし']* num
    try:
        setu_list = all_list['節']
    except:
        setu_list = ['なし']* num
    try:
        setu_name_list = all_list['節の名称']
    except:
        setu_name_list = ['なし']* num
    try:
        hen_list = all_list['ArticleCaption']
    except:
        hen_list = ['なし']* num
    try:
        hen_name_list = all_list['編の名称']
    except:
        hen_name_list = ['なし']* num
    try:
        ko_list = all_list['項']
    except:
        ko_list = ['なし']* num
    try:
        ko_name_list = all_list['項の名称']
    except:
        ko_name_list = ['なし']* num
    try:
        syozoku_list = all_list['所属']
    except:
        syozoku_list = ['なし']* num

    id_list = all_list['id']
    sentence_list = all_list['Sentence']
    konkyo_list = all_list['根拠_id']
    hosoku_list = all_list['補足_id']
    sentence_morpho_list = all_list['sentence_morpho']
    num = len(all_list['id'])

    driver = GraphDatabase.driver("neo4j://localhost:7687", auth=basic_auth("neo4j", "handhara66"))
    session = driver.session()
    #文章ノード作り

    for i in range (len(all_list)):
        #リストを読み込み
        sen_id = id_list[i]
        sen_bunsyo = bunsyo
        sen_syo = str(syo_list[i])+ str(syo_name_list[i])
        sen_zyo = str(zyo_list[i])
        sen_setu = str(setu_list[i])+ str(setu_name_list[i])
        sen_ko = str(ko_list[i]) + str(ko_name_list[i])
        sen_hen = str(hen_list[i])+ str(hen_name_list[i])
        sen_sentence = str(sentence_list[i]).replace(' ','').replace("'",'').replace('[','').replace(']','')
        if syozoku_list[i]==syozoku_list[i]:
            sen_syozoku = syozoku_list[i]
        else:
            sen_syozoku = 0
        sen_morpho = sentence_morpho_list[i].replace(' ','').replace("'",'').replace('[','').replace(']','')
        #print(sen_id)

        #単語更新追加
        sen_morpho_sep = sen_morpho.split(',')

        for p in sen_morpho_sep:
            print(str(p))

            #単語更新追加
            session.run("MERGE (:Inword {単語:'"+ str(p) + "'})");
            #session.run("MATCH (a:Inword {単語:'"+ str(p) + "'})SET a.文書id = " + str(sen_id) + ";");

"""

        #文章ノードを追加

        session.run("CREATE(a:sentence {文書id :"+ str(sen_id) + ",文書名 :'" +str(bunsyo)+"',条:'"+ str(sen_zyo)+ "',章:'"+ str(sen_syo)+ "',節:'"+ str(sen_setu)+ "',項:'"+ str(sen_ko)+"',編:'"+ str(sen_hen)+"',文章:'"+ str(sen_sentence)+ "',所属 :'"+ str(sen_syozoku)  +"',形態素解析:'" + str(sen_morpho) +  "'})");

        print(len(sen_morpho))
        print(type(sen_morpho))
        print(sen_morpho[0])

        sen_morpho_sep = sen_morpho.split(',')

        for p in sen_morpho_sep:
            print(str(p))
            #単語ノード追加
            session.run("CREATE UNIQUE(a:word {単語:'"+ str(p) + "',文書id :'" +str(sen_id)+"',文書名 :'" +str(bunsyo)+"',文章:'"+ str(sen_sentence)+ "',所属 :'"+ str(sen_syozoku)  + "'})");


        #リレーション作り
        sen_syozoku = syozoku_list[i]
        sen_konkyo = konkyo_list[i].replace(' ','').replace("'",'').replace('[','').replace(']','').replace(" ",'').split(',')
        sen_hosoku = hosoku_list[i].replace(' ','').replace("'",'').replace('[','').replace(']','').replace(" ",'').split(',')
        konkyo_num_list = []

        #根拠リレーション
        for k in sen_konkyo:
            try:
                #konkyo_num_list.append(k)
                print(str(sen_id))
                print(str(k))
                session.run("MATCH (a:Sentence{id:"+ str(sen_id) +"}),(b:Sentence{id:"+ str(k) +"}) CREATE (a)-[relation:根拠]->(b);");
            except:
                a=0

        #所属リレーション
        try:
            #konkyo_num_list.append(k)
            print(str(sen_id))
            print(str(l))
            session.run("MATCH (a:Sentence{id:"+ str(sen_id) +"}),(b:Sentence{id:"+ str(sen_syozoku) +"}) CREATE (a)-[relation:所属]->(b);");
        except:
            a=0

        #補足リレーション
        for b in sen_konkyo:
            try:
                #konkyo_num_list.append(k)
                print(str(sen_id))
                print(str(b))
                session.run("MATCH (a:Sentence{id:"+ str(sen_id) +"}),(b:Sentence{id:"+ str(b) +"}) CREATE (a)-[relation:補足]->(b);");
            except:
                a=0
"""
session.close()
