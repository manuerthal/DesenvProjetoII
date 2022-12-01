package controllers

import (
	"tente-adivinhar/db"
	"tente-adivinhar/models"

	"github.com/gin-gonic/gin"
)

func GetAnswers() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		allAnswers := []models.Answer{}
		db.DB.Find(&allAnswers)
		answersMap := []gin.H{}

		for _, answer := range allAnswers {
			answersMap = append(answersMap, gin.H{
				"id":          answer.ID,
				"person_name": answer.PersonName,
				"streak":      answer.Streak,
				"attempts":    answer.Attempts,
			})
		}

		ctx.JSON(
			200,
			answersMap,
		)
	}
}

func IncreaseStreak() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		answer := models.Answer{}
		personName := ctx.PostForm("name")

		err := db.DB.First(&answer, "person_name = ?", personName).Error
		if err != nil {
			answer.PersonName = personName
			answer.Streak = 1
			answer.Attempts = 1
			db.DB.Create(&answer)
			ctx.Status(200)
			return
		}

		answer.Streak++
		answer.Attempts++
		err = db.DB.Updates(&answer).Error
		if err != nil {
			ctx.AbortWithStatus(500)
			return
		}

		ctx.Status(200)
	}
}

func init() {
	db.DB.AutoMigrate(models.Answer{})
}
