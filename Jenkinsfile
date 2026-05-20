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
                script {
                    if (isUnix()) {
                        sh '''
                            export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

                            echo "PATH=$PATH"

                            node -v
                            npm -v

                            npm install
                            npm run build
                        '''
                    } else {
                        bat '''
                            call npm install
                            call npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy Frontend Dist to Tomcat') {
            when {
                expression {
                    return env.GIT_BRANCH == 'origin/main' || env.GIT_BRANCH == 'origin/master'
                }
            }

            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            TOMCAT_WEBAPPS="/opt/homebrew/opt/tomcat/libexec/webapps"
                            APP_NAME="${JOB_NAME}"

                            if [ ! -d "$WORKSPACE/dist" ]; then
                                echo "Pasta dist nao encontrada."
                                exit 1
                            fi

                            rm -rf "$TOMCAT_WEBAPPS/$APP_NAME"
                            mkdir -p "$TOMCAT_WEBAPPS/$APP_NAME"

                            cp -R "$WORKSPACE/dist/"* "$TOMCAT_WEBAPPS/$APP_NAME/"

                            echo "Deploy frontend concluido com sucesso"
                        '''
                    } else {
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

                            echo Deploy frontend concluido com sucesso
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline concluído.'
        }

        success {
            echo '🎉 Build e deploy realizados com sucesso!'
        }

        failure {
            echo '❌ Falha detectada no pipeline.'
        }
    }
}