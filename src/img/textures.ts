import { dirtImg, glassImg, grassImg, logImg, woodImg } from '.'
import { LoadingManager, TextureLoader } from 'three'

export const dirtTexture = new TextureLoader().load(dirtImg);
export const glassTexture = new TextureLoader().load(glassImg);
export const grassTexture = new TextureLoader().load(grassImg);
export const logTexture = new TextureLoader().load(logImg);
export const woodTexture = new TextureLoader().load(woodImg);
