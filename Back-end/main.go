package main

import "tente-adivinhar/config"

func main() {
	engine := config.CreateEngine()
	engine.Run()
}
