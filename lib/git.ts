import { execSync } from 'node:child_process'
import path from 'node:path'

const REPO_ROOT = path.resolve(process.cwd())

function lastModified(filePath: string): Date {
  try {
    const isoDate = execSync(`git log -1 --format=%cI -- "${filePath}"`, { cwd: REPO_ROOT })
      .toString()
      .trim()
    return isoDate ? new Date(isoDate) : new Date()
  } catch {
    return new Date()
  }
}

export { lastModified }
