@ECHO OFF
set ERRORLEVEL=0

set MSBPATH="C:\Program Files (x86)\MSBuild\14.0\Bin\msbuild.exe"

ECHO Checking for MSBuild...
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD 

%MSBPATH% Infor.Sxe.Web.BackEnd.sln /t:clean /flp:logfile=BuildLog.txt || GOTO ERROR
GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
GOTO END

:ERROR
ECHO Error building the source code.
GOTO END

:END
cmd /k