@echo off
REM ==========================================
REM Generate daily reports + index.html
REM ==========================================

REM Lấy đường dẫn tuyệt đối tới thư mục "reports" cạnh file .bat
set "REPORT_DIR=%~dp0reports"

echo.
echo === Generating daily reports... ===

REM Lặp qua tất cả thư mục con trong reports (dd-mm-yyyy)
for /d %%D in ("%REPORT_DIR%\*") do (
    if exist "%%D" (
        echo Processing folder %%~nxD ...
        python "%~dp0generate_report.py" "%%D" -o "%%D\report.html"
    )
)

echo.
echo === Generating index.html ===
python "%~dp0generate_history.py" "%REPORT_DIR%" -o "%REPORT_DIR%\index.html"

echo.
echo ✔ Done!
echo Open "%REPORT_DIR%\index.html" in your browser.

REM Tự mở index.html sau khi xong (nếu không muốn thì bỏ dòng dưới)
start "" "%REPORT_DIR%\index.html"

pause
