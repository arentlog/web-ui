@ECHO OFF
set ERRORLEVEL=0

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
%MSBPATH% Build.proj /t:PackageNoCopyBuild /p:Configuration=Debug /flp:logfile=PackageNoCopyBuildLog.txt /p:VisualStudioVersion=15.0 /m || GOTO ERROR
GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
exit /b 1

:ERROR
ECHO Error building the source code.
exit /b 2

:END
