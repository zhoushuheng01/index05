var db;

function fnInitDB() {
    db = api.require('db');
};

var DATABASE = 'database_toutiao'

function fnOpenDatabase() {
    fnInitDB();

    db.openDatabase({
        name: DATABASE
    }, function(ret, err) {
        fnCreateFavorite();
    });
};

var FAVORITE = 'table_favorite';

function fnCreateFavorite() {
    db.executeSql({
        name: DATABASE,
        sql: 'CREATE TABLE ' + FAVORITE + '(headId VARCHAR(64))'
    }, function(ret) {
        if (ret.status) {
            fnCreateFavoriteIndex();
        }
    });
};

function fnCreateFavoriteIndex() {
    db.executeSql({
        name: DATABASE,
        sql: 'CREATE UNIQUE INDEX ' + FAVORITE + '_index on ' + FAVORITE + '(headId)'
    });
};

function fnSelectFavorite(callback) {
    db.selectSql({
        name: DATABASE,
        sql: 'SELECT headId FROM ' + FAVORITE
    }, callback);
};

function fnSelectFavoriteById(headId, callback) {
    db.selectSql({
        name: DATABASE,
        sql: 'SELECT headId FROM ' + FAVORITE + ' WHERE headId="' + headId + '"'
    }, callback);
};

function fnAddFavorite(headId, callback) {
    db.executeSql({
        name: DATABASE,
        sql: 'REPLACE INTO ' + FAVORITE + '(headId) VALUES("' + headId + '")'
    }, callback);
};

function fnRemoveFavorite(headId, callback) {
    db.executeSql({
        name: DATABASE,
        sql: 'DELETE FROM ' + FAVORITE + ' WHERE headId="' + headId + '"'
    }, callback);
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                          雅客数据库

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Database(){
    db = api.require('db');

    //数据库的名字
    this.name = "Yake";
}



Database.prototype = {
    constructor:Database,
    /*
        选择数据库

        @name   默认 'fs://res/database/Yake.db'
     */
    databass : function(callback){

        db.openDatabase({
            name: this.name,
            path:'fs://res/database/Yake.db'
        }, function(ret, err) {
            if( typeof callback ==　'function' ){
                callback(ret, err);
            }

        });

    },
    /*
     * sql
     */
    sql : function(sql,callback){
        db.executeSql({
            name: this.name,
            sql:sql
        }, function(ret, err) {
            if( typeof callback ==　'function' ){
                callback(ret, err);
            }
        });
    }

}