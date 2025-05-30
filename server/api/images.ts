import { getImagePaths } from '~/utils/getImagePaths'

export default defineEventHandler((event) => {
  return getImagePaths(['image/character_portrait', 'icon/character'])
})
