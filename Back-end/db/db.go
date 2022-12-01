package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB = openDB()

func openDB() *gorm.DB {
	newDB, err := gorm.Open(sqlite.Open("./db/db.db"))
	if err != nil {
		panic(err)
	}
	return newDB
}
