@echo off
REM This batch file runs a specific Playwright test with a custom environment variable.

REM Change directory to your project folder.
cd ../

REM Set the environment variable for the test.
REM This variable will only be set for the current command prompt session.
set NUMBER_OF_TEST_RESULTS=1 && set UPLOAD_TO_REPORT_PORTAL=false && set PAGE_SIZE=200

REM Execute the Playwright test command.
echo "Starting Playwright test..."
call npx playwright test dws-test-result-rp.spec.ts

echo "Test execution finished."

REM Pause the script to see the output before the window closes.
pause

