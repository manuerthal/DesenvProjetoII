package config

import (
	"tente-adivinhar/controllers"

	"github.com/gin-gonic/gin"
)

func CreateEngine() *gin.Engine {
	engine := gin.Default()

	engine.Static("/frontend/", "./../Front-end/")

	engine.GET("/", func(ctx *gin.Context) {
		ctx.Redirect(301, "/frontend/escolhas.html")
	})
	engine.GET("/answer/get", controllers.GetAnswersByName())
	engine.GET("/answer/get_all", controllers.GetAnswers())
	engine.PUT("/answer/increase_streak", controllers.IncreaseStreak())

	engine.PUT("/answer/end_streak", controllers.EndStreak())
	return engine
}
