package config

import (
	"tente-adivinhar/controllers"

	"github.com/gin-gonic/gin"
)

func CreateEngine() *gin.Engine {
	engine := gin.Default()
	engine.GET("/answer/get_all", controllers.GetAnswers())
	engine.PUT("/answer/increase_streak", controllers.IncreaseStreak())
	return engine
}
