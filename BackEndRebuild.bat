@ECHO OFF
set ERRORLEVEL=0

REM -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
REM This batch file will attempt to first use the default VS2017 Professional location for build tools.
REM If this fails it will try to use the Enterprise location.
REM If this fails because VS2017 has been placed on another drive or different location, please set up an environment variable with the full path including the msbuild.exe.  
REM The environment variable must be called SXEH5BUILDPATH and it should be wrapped in double quotes.
REM -----------------------------------------------------------------------------------------------------------------------------------------------------------------------


:PROFESSIONAL
set MSBPATH="C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\msbuild.exe"
ECHO Checking for MSBuild (Professional) 
IF NOT EXIST %MSBPATH% GOTO ENTERPRISE
GOTO DOBUILD
 
:ENTERPRISE
set MSBPATH="C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\msbuild.exe"
ECHO Checking for MSBuild (Enterprise) 
IF NOT EXIST %MSBPATH% GOTO ENVPATH
GOTO DOBUILD

:ENVPATH
set MSBPATH=%SXEH5BUILDPATH%
ECHO Checking for MSBuild (Environment Path SXEH5BUILDPATH) 
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD
 
:DOBUILD
%MSBPATH% Infor.Sxe.Web.BackEnd.sln /t:rebuild /flp:logfile=BuildLog.txt /m || GOTO ERROR
GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
GOTO END

:ERROR
ECHO Error building the source code.
GOTO END

:END
cmd /k