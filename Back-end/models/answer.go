package models

import "gorm.io/gorm"

type Answer struct {
	gorm.Model
	PersonName string `gorm:"unique;not null"`
	Streak     uint
	Attempts   uint
}
