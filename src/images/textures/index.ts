import * as PIXI from 'pixi.js'
import { clientUrl } from 'utils/server';
import MapTexture from './map.png';
import NoGoZoneTexture from './nogozone.png';
import HiddenTexture from './hidden.png';
import TargetTexture from './target.png';
import ShieldTexture from './shield.png';
import ShipTexture from '../uikit/ship-icon.png';
import StarbaseTexture from '../uikit/starbase-icon.png';
import UserTexture from '../uikit/user-icon.png'
import UsersTexture from '../uikit/users-icon.png'

export {
	MapTexture,
	NoGoZoneTexture,
	HiddenTexture,
	ShipTexture,
	TargetTexture,
	UserTexture,
	UsersTexture,
	StarbaseTexture,
};

export enum Asset {
	MapBackground = 'mapBackground',
	NoGoZone = 'noGoZone',
}

export const loadMapAssets = (complete: () => void) => {
	const loader = PIXI.Loader.shared

	for (let i = 1; i <= 5; i++) {
		let url = clientUrl() + `/sprites/planets/mini/${i}.png`
		loader.add(`planet-mini-${i}`, url)
		url = clientUrl() + `/sprites/planets/medium/${i}.png`
		loader.add(`planet-medium-${i}`, url)
	}

	for (let i = 1; i <= 5; i++) {
		let url = clientUrl() + `/sprites/asteroids/empty/${i}-1.png`
		loader.add(`asteroid-empty-${i}-1`, url)
		url = clientUrl() + `/sprites/asteroids/empty/${i}-2.png`
		loader.add(`asteroid-empty-${i}-2`, url)
	}

	loader
		.add('sun-mini-1', clientUrl() + `/sprites/planets/mini/sun1.png`)
		.add('sun-medium-1', clientUrl() + `/sprites/planets/medium/sun1.png`)

		// Laser
		.add('laser-beam', clientUrl() + `/sprites/actions/laser.png`)
		.add('beam-sparks', clientUrl() + '/sprites/actions/beam-sparks-sheet.json')

		// Thrusters
		.add('thruster-1-s', clientUrl() + '/sprites/actions/thrusters-fire-start.json')
		.add('thruster-1-m', clientUrl() + '/sprites/actions/thrusters-fire-move.json')
		.add('thruster-2-s', clientUrl() + '/sprites/actions/thrusters-main-start.json')
		.add('thruster-2-m', clientUrl() + '/sprites/actions/thrusters-main-move.json')
		.add('thruster-3-s', clientUrl() + '/sprites/actions/thrusters-special-start.json')
		.add('thruster-3-m', clientUrl() + '/sprites/actions/thrusters-special-move.json')

		// Map items
		.add('stars', clientUrl() + '/sprites/environment/stars.json')

		// Bullets
		.add('bullet-green', clientUrl() + '/sprites/bullets/green.json')

		.add('mapBackground', MapTexture)
		.add('noGoZone', NoGoZoneTexture)
		.add('shield', ShieldTexture)
		.load()

	loader.onComplete.add(complete)
}

export const getCacheAsset = (asset: Asset | string): PIXI.Texture<PIXI.Resource> | undefined => {
	return PIXI.Loader.shared.resources[asset].texture
}

export const getCacheSheet = (asset: Asset | string): PIXI.Spritesheet | undefined => {
	return PIXI.Loader.shared.resources[asset].spritesheet;
}

export const getSpaceshipImage = (level: number, image: string) => {
	return `https://krogancoin.com/QmeeQK6V9uv71xyNbGy5q1PHRuBHy1EYXVMs9sS5bP1iYY/${level}/${image}`
}

export const getQwtSpaceshipImage = () => {
	return clientUrl() + '/sprites/QoWatt.png'
}

export const getSpriteImage = (path: string) => {
	return clientUrl() + '/sprites' + path
}