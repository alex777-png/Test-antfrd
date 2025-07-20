@echo off
setlocal

:: === НАСТРОЙКИ ===
set GITHUB_USERNAME=alex777-png
set REPO_NAME=test-antfrd
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
set COMMIT_MESSAGE=init commit
set WORKDIR=%cd%

:: === ПРОВЕРКА GIT ===
git --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Git не установлен. Скачай с https://git-scm.com/downloads
    pause
    exit /b
)

:: === ИНИЦИАЛИЗАЦИЯ РЕПО ===
echo [INFO] Инициализация Git-репозитория...
git init
git remote add origin %REPO_URL%
git add .
git commit -m "%COMMIT_MESSAGE%"
git branch -M main

:: === ФОРСИРОВАННЫЙ PUSH ===
echo [INFO] Форсированная загрузка в репозиторий...
git push --force origin main

echo [ГОТОВО] Загружено на: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
pause
