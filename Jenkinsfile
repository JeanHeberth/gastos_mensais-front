pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                bat '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Deploy Frontend Dist to Tomcat Windows') {
            when {
                expression {
                    return env.GIT_BRANCH == 'origin/main' || env.GIT_BRANCH == 'origin/master'
                }
            }
            steps {
                bat '''
                    set TOMCAT_WEBAPPS=C:\\apache-tomcat-11.0.11\\webapps
                    set APP_NAME=%JOB_NAME%

                    if not exist "%WORKSPACE%\\dist" (
                        echo Pasta dist nao encontrada.
                        exit /b 1
                    )

                    if exist "%TOMCAT_WEBAPPS%\\%APP_NAME%" (
                        rmdir /S /Q "%TOMCAT_WEBAPPS%\\%APP_NAME%"
                    )

                    mkdir "%TOMCAT_WEBAPPS%\\%APP_NAME%"
                    xcopy /E /I /Y "%WORKSPACE%\\dist\\*" "%TOMCAT_WEBAPPS%\\%APP_NAME%\\"

                    echo Deploy frontend concluido.
                '''
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline concluído.'
        }
    }
}