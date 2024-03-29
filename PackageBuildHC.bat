@ECHO OFF 
set ERRORLEVEL=0

set MSBPATH="C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin\msbuild.exe"

ECHO Checking for MSBuild...
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD 

%MSBPATH% BuildHC.proj /t:PackageBuild /p:Configuration=Release /flp:logfile=PackageBuildLog.txt /p:VisualStudioVersion=15.0 /m || GOTO ERROR
GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
exit /b 1

:ERROR
ECHO Error building the source code.
exit /b 2

:END
