import * as PIXI from 'pixi.js'

const aspectFillScale = (sprite: PIXI.Sprite, width: number, height: number) => {
	const scaleX = width / sprite.width
	const scaleY = height / sprite.height
	sprite.scale.x = Math.max(scaleX, scaleY)
	sprite.scale.y = Math.max(scaleX, scaleY)
}

export { aspectFillScale }