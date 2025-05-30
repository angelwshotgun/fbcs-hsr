import fs from 'fs'
import path from 'path'

export function getImagePaths(baseDirs: string[]) {
  const publicDir = path.resolve(process.cwd(), 'public')
  const result: string[] = []

  function walk(dir: string) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (/\.(avif|png|jpe?g|webp|svg)$/i.test(file)) {
        const relativePath = path.relative(publicDir, fullPath).replace(/\\/g, '/')
        result.push(relativePath)
      }
    }
  }

  for (const baseDir of baseDirs) {
    const fullDir = path.join(publicDir, baseDir)
    if (fs.existsSync(fullDir)) walk(fullDir)
  }

  return result
}
