# Script para inicializar un repositorio Git y hacer el primer commit

# Inicializar el repositorio Git
git init

# Añadir todos los archivos al staging area
git add .

# Hacer el primer commit
git commit -m "Commit inicial del proyecto"

# Instrucciones para conectar con GitHub
Write-Host ""
Write-Host "Repositorio Git inicializado y primer commit realizado." -ForegroundColor Green
Write-Host ""
Write-Host "Para conectar con GitHub, sigue estos pasos:" -ForegroundColor Yellow
Write-Host "1. Crea un nuevo repositorio en GitHub (sin README, .gitignore o licencia)" -ForegroundColor Yellow
Write-Host "2. Ejecuta los siguientes comandos:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/tu-usuario/ProyectoAnalisi.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Recuerda reemplazar 'tu-usuario' con tu nombre de usuario de GitHub." -ForegroundColor Yellow