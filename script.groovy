jobName = sh (script: "echo ${JOB_NAME}",returnStdout: true).trim() // removeing leading and trailing space
buildNumber = sh (script: "echo ${BUILD_NUMBER}",returnStdout: true).trim() // removeing leading and trailing space
buildUrl = sh (script: "echo ${BUILD_URL}",returnStdout: true).trim() // removeing leading and trailing space
environmentMap = ["dev-mercuri-front-pipeline": "dit","stg-mercuri-front-pipeline": "stg"]
ebAppMap = ["dev-mercuri-front-pipeline": "dev-stg-mercuri-front-app","stg-mercuri-front-pipeline": "dev-stg-mercuri-front-app"]
ebEnvMap = ["dev-mercuri-front-pipeline": "dev-mercuri-front-server-1","stg-mercuri-front-pipeline": "stg-mercuri-front-server"]
s3BucketMap = ["dev-mercuri-front-pipeline": "dev-stg-mercuri-source-code","stg-mercuri-front-pipeline": "dev-stg-mercuri-source-code"]
regionMap = ["dev-mercuri-front-pipeline": "us-east-1","stg-mercuri-front-pipeline": "us-east-1"]
urlMap = ["dev-mercuri-front-pipeline":"http://awseb-awseb-1eek3ypq14ic8-45200070.us-east-1.elb.amazonaws.com","stg-mercuri-front-pipeline":"http://awseb-AWSEB-1QBBRVCPAJJBG-954750945.us-east-1.elb.amazonaws.com"]
BRANCH = sh (script: "echo $GIT_BRANCH | sed -e 's|origin/||g'",returnStdout: true).trim()
DESCRIPTION = sh (script: """echo \$(git log -1 --pretty=%B | awk '{print substr(\$0,1,150);exit}')""",returnStdout: true).trim()

def runPackage() {
  sh '''
  npm i
  npm run build
  zip -r build.zip .
  '''
  checkBuildStatus()
}
 
def runS3Copy() {
  sh "aws s3 cp build.zip s3://${getS3Bucket()}/$BUILD_TAG/build.zip"
  checkBuildStatus()
}

def runDeploy() {
  createEBApplication()
  checkBuildStatus()
  updateEBEnvironment()
  checkBuildStatus()
}

def runCleanUP(){
  sh '''
  rm build.zip
  rm -f package-lock.json
  rm -rf node_modules
  '''
  checkBuildStatus()
}

def generateLightHouseReport(buildColor){
  sh 'sleep 120'
  def report = sh (script: """npx lighthouse-ci ${getURLMap()} --jsonReport --report=.""",returnStdout: true).trim()
  def performance = sh (script: """echo "${report}" | grep performance | sed 's/^performance://'""",returnStdout: true).trim()
  office365ConnectorSend status:"""LightHouse Score: ${performance}, LightHouse Report: <${buildUrl}lighthousereport>""", message: "Latest status of build #${buildNumber}",webhookUrl: "${env.TEAM_NOTIFICATION_WEBHOOK_URL}",color: buildColor
  lighthouseReport('./report.json')
}

def buildTeamNotification(buildStatus,buildColor) {
  office365ConnectorSend message: "Latest status of build #${buildNumber}", status: buildStatus, webhookUrl: "${env.TEAM_NOTIFICATION_WEBHOOK_URL}",color: buildColor
}

def getEnvironment() {
    return environmentMap.get(jobName)
}

def getRegion() {
    return regionMap.get(jobName)
}

def getURLMap() {
  return urlMap.get(jobName)
}

def getEBAppName() {
  return ebAppMap.get(jobName)
}

def getEBEnvName() {
  return ebEnvMap.get(jobName)
}

def getS3Bucket() {
  return s3BucketMap.get(jobName)
}

def createEBApplication() {
  sh (
    script: """
    aws elasticbeanstalk create-application-version --application-name ${getEBAppName()} \
    --version-label $BRANCH-$GIT_COMMIT-$BUILD_TAG \
    --description "$DESCRIPTION" \
    --source-bundle S3Bucket=${getS3Bucket()},S3Key=$BUILD_TAG/build.zip \
    --region ${getRegion()}""",
    returnStdout: true
  ).trim()
}

def updateEBEnvironment() {
  sh (
    script: """
    aws elasticbeanstalk update-environment \
    --environment-name ${getEBEnvName()} \
    --version-label $BRANCH-$GIT_COMMIT-$BUILD_TAG \
    --region ${getRegion()}""",
    returnStdout: true
  ).trim()
}

def checkBuildStatus(){
  if ('FAILURE'.equals(currentBuild.result)) {
    sh "echo 'Some error occurred in this stage, check the above section logs for more details'; exit 1"
  }
}

return this