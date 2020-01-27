@ECHO OFF 
set ERRORLEVEL=0
 
set MSBPATH="C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin\msbuild.exe"
set MSBPATHPRECOM="C:\Windows\Microsoft.NET\Framework\v4.0.30319\aspnet_compiler.exe"
 
ECHO Checking for MSBuild...
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD 
IF NOT EXIST %MSBPATHPRECOM% GOTO NOMSBUILD 


%MSBPATH% BuildHC.proj /flp:logfile=BuildLog.txt /p:VisualStudioVersion=15.0 /p:Configuration=Debug /m  || GOTO ERROR
%MSBPATHPRECOM% -p "./FrontEnd/Infor.Sxe.Web.HealthCheck" -v "Infor.Sxe.Web.HealthCheck/" -fixednames -f -c -d "./PrecompiledWeb/Infor.Sxe.Web.HealthCheck" || GOTO ERROR
DEL .\PrecompiledWeb\Infor.Sxe.Web.HealthCheck\bin\*.xml
DEL .\PrecompiledWeb\Infor.Sxe.Web.HealthCheck\bin\*.COMPILED
DEL .\PrecompiledWeb\Infor.Sxe.Web.HealthCheck\bin\*.config

GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
exit /b 1

:ERROR
ECHO Error building the source code. 
exit /b 2 

:END 
 