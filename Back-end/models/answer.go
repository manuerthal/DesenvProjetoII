package models

import "gorm.io/gorm"

type PersonAnswers struct {
	gorm.Model
	PersonName string `gorm:"unique;not null"`
	Streak     uint
	Attempts   uint
}
