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

            echo Pasta dist: %WORKSPACE%\\dist
            echo Destino: %TOMCAT_WEBAPPS%\\%APP_NAME%

            if not exist "%WORKSPACE%\\dist" (
                echo Pasta dist nao encontrada.
                exit /b 1
            )

            if exist "%TOMCAT_WEBAPPS%\\%APP_NAME%" (
                rmdir /S /Q "%TOMCAT_WEBAPPS%\\%APP_NAME%"
            )

            mkdir "%TOMCAT_WEBAPPS%\\%APP_NAME%"

            xcopy /E /I /Y "%WORKSPACE%\\dist\\*" "%TOMCAT_WEBAPPS%\\%APP_NAME%\\"

            echo Deploy frontend concluido: %TOMCAT_WEBAPPS%\\%APP_NAME%
        '''
    }
}