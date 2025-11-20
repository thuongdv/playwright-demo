@echo off
REM ==========================================
REM Generate daily reports + index.html
REM ==========================================

REM Record start time
set "START_TIME=%time%"
echo Start time: %START_TIME%

REM Get the absolute path to the "reports" folder next to the .bat file
set "REPORT_DIR=%~dp0reports"

echo.
echo === Generating daily reports in parallel... ===

REM Use PowerShell jobs for parallel execution (compatible with PowerShell 5.1+)
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $reportDir = '%REPORT_DIR%'; $scriptPath = '%~dp0generate_report.py'; $jobs = @(); Get-ChildItem -Path $reportDir -Directory | ForEach-Object { $folder = $_; $job = Start-Job -ScriptBlock { param($folderPath, $folderName, $scriptPath) $outputPath = Join-Path $folderPath 'report.html'; Write-Host \"Processing folder $folderName ...\"; python $scriptPath $folderPath -o $outputPath } -ArgumentList $folder.FullName, $folder.Name, $scriptPath; $jobs += $job }; Write-Host \"Started $($jobs.Count) parallel jobs...\"; $jobs | Wait-Job | Receive-Job; $jobs | Remove-Job }"

echo.
echo === Generating index.html ===
python "%~dp0generate_history.py" "%REPORT_DIR%" -o "%REPORT_DIR%\index.html"

REM Calculate execution time
set "END_TIME=%time%"
echo.
echo === Execution Summary ===
echo Start time: %START_TIME%
echo End time:   %END_TIME%

REM Calculate duration (simple version)
powershell -NoProfile -Command "& { $start = [datetime]'%START_TIME%'; $end = [datetime]'%END_TIME%'; $duration = $end - $start; if ($duration.TotalSeconds -lt 0) { $duration = $duration.Add([timespan]::FromDays(1)) }; Write-Host \"Total execution time: $([math]::Round($duration.TotalSeconds, 2)) seconds\" }"

echo.
echo Done!
echo Open "%REPORT_DIR%\index.html" in your browser.

REM Automatically open index.html after finishing (if you don't want, remove the line below)
start "" "%REPORT_DIR%\index.html"

pause
