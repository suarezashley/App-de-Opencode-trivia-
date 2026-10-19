@echo off
setlocal
rem ============================================================
rem  Compila el APK de la app Trivia Multiplicacion y lo copia
rem  a la raiz del proyecto como "app-release.apk"
rem ============================================================

set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"

echo [1/3] Compilando APK (release)...
echo.
echo   Consejo: para un APK mas pequeno (solo telefonos arm64):
echo     build-apk.cmd -PreactNativeArchitectures=arm64-v8a
echo.
cd /d "%~dp0android"
call gradlew.bat assembleRelease %*
if errorlevel 1 (
  echo.
  echo ERROR: la compilacion fallo.
  exit /b 1
)

echo.
echo [2/3] Copiando APK a la raiz del proyecto...
copy /y "app\build\outputs\apk\release\app-release.apk" "%~dp0app-release.apk" >nul
if errorlevel 1 (
  echo ERROR: no se pudo copiar el APK.
  exit /b 1
)

echo.
echo [3/3] LISTO
echo APK: %~dp0app-release.apk
endlocal
