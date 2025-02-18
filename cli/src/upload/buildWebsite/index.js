import execute from '../../helpers/execute'
import getScriptToRun from './getScriptToRun'
import colors from 'colors'
import copyExtensions from './copyExtensions'
import addVersionHelper from './addVersionHelper'

export default async function({build, buildDir, staticWebsite}) {
  console.log(colors.bold('Building static website...'))

  const appDir = process.cwd()
  const script = await getScriptToRun({build, buildDir})
  const env = Object.assign(process.env, {
    BUILD_DIR: buildDir,
    APP_DIR: appDir
  })

  await execute(script, {
    env,
    cwd: appDir,
    detached: true,
    stdio: 'inherit'
  })

  await addVersionHelper({buildDir, staticWebsite})
  await copyExtensions({buildDir, appDir})

  console.log(colors.bold('Static website built'))

  return `${buildDir}/build`
}
