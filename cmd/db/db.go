package db

import (
	"database/sql"
	"os"

	"github.com/joho/godotenv"
)

var (
	DB *sql.DB
)

func NewDB() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	db_user := os.Getenv("DB_USER")
	db_passwd := os.Getenv("DB_PASSWD")
	db_host := os.Getenv("DB_HOST")
	db_port := os.Getenv("DB_PORT")
	db_dbname := os.Getenv("DB_DBNAME")
	DB, err = sql.Open("mysql", db_user+":"+db_passwd+"@tcp("+db_host+":"+db_port+")/"+db_dbname+"?parseTime=true")
	if err != nil {
		panic(err)
	}
	println("DB connected")
}
