package controllers

import (
	"tente-adivinhar/db"
	"tente-adivinhar/models"

	"github.com/gin-gonic/gin"
)

func GetAnswersByName() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		answer := models.PersonAnswers{}
		personName := ctx.Query("name")
		err := db.DB.First(&answer, "person_name = ?", personName).Error
		if err != nil {
			ctx.AbortWithStatus(404)
			return
		}

		ctx.JSON(
			200, gin.H{
				"id":          answer.ID,
				"person_name": answer.PersonName,
				"streak":      answer.Streak,
				"wins":        answer.Wins,
				"attempts":    answer.Attempts,
			},
		)
	}
}

func GetAnswers() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		allAnswers := []models.PersonAnswers{}
		db.DB.Find(&allAnswers)
		answersMap := []gin.H{}

		for _, answer := range allAnswers {
			answersMap = append(answersMap, gin.H{
				"id":          answer.ID,
				"person_name": answer.PersonName,
				"streak":      answer.Streak,
				"wins":        answer.Wins,
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
		answer := models.PersonAnswers{}
		personName := ctx.PostForm("name")

		err := db.DB.First(&answer, "person_name = ?", personName).Error
		if err != nil {
			answer.PersonName = personName
			answer.Streak = 1
			answer.Attempts = 1
			answer.Wins = 1
			db.DB.Create(&answer)
			ctx.Status(200)
			return
		}

		answer.Streak++
		answer.Attempts++
		answer.Wins++
		err = db.DB.Updates(&answer).Error
		if err != nil {
			ctx.AbortWithStatus(500)
			return
		}

		ctx.Status(200)
	}
}

func EndStreak() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		answer := models.PersonAnswers{}
		personName := ctx.PostForm("name")

		err := db.DB.First(&answer, "person_name = ?", personName).Error
		if err != nil {
			answer.PersonName = personName
			answer.Attempts = 1
			db.DB.Create(&answer)
			ctx.Status(200)
			return
		}

		answer.Streak = 0
		answer.Attempts++
		err = db.DB.Select("streak", "attempts").Updates(&answer).Error
		if err != nil {
			ctx.AbortWithStatus(500)
			return
		}

		ctx.Status(200)
	}
}

func init() {
	db.DB.AutoMigrate(models.PersonAnswers{})
}
