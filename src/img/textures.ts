import { dirtImg, glassImg, grassImg, logImg, woodImg } from '.'
import { LinearMipMapLinearFilter, NearestFilter, TextureLoader } from 'three'

const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);

dirtTexture.magFilter = NearestFilter;
dirtTexture.minFilter = LinearMipMapLinearFilter;

glassTexture.magFilter = NearestFilter;
glassTexture.minFilter = LinearMipMapLinearFilter;

grassTexture.magFilter = NearestFilter;
grassTexture.minFilter = LinearMipMapLinearFilter;

logTexture.magFilter = NearestFilter;
logTexture.minFilter = LinearMipMapLinearFilter;

woodTexture.magFilter = NearestFilter;
woodTexture.minFilter = LinearMipMapLinearFilter;

export {
    dirtTexture,
    glassTexture,
    grassTexture,
    logTexture,
    woodTexture,
}
