@echo off
:: -----------------------------------------------------------------------------------------------------------------------
:: Beginning 11.18.6, this file should not be modified to specify the deployment target.
::
:: In the Jenkins build step where deploy.bat is called add the necessary lines to set the environment variable below.
::
:: Example.
:: To set the server to server name foo, with username, foouser, password foopassword, application website fooH5 you would 
:: add the following lines above the deploy.bat
::
:: set SERVER=foo
:: set APPWEBSITE=fooH5
:: set USER=foouser
:: set PASSWORD=foopassword
:: deploy.bat
::
:: Any variable not set will default as shown below.
:: -----------------------------------------------------------------------------------------------------------------------
set ERRORLEVEL=0

IF NOT DEFINED SERVER (
    set SERVER=uscswdev01
)
IF NOT DEFINED WEBSITE (
    set WEBSITE=Default Web Site
)
IF NOT DEFINED APPWEBSITE (
    set APPWEBSITE=SxeH5
)
IF NOT DEFINED USER (
    set USER=webdeploy
)
IF NOT DEFINED PASSWORD (
    set PASSWORD=webdeploy
)

set MSBPATH="c:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe"

ECHO Checking for MSDeploy...
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD 

%MSBPATH% -verb:sync -source:contentPath="%~dp0Builds\build" -dest:contentPath='%WEBSITE%/%APPWEBSITE%',ComputerName="https://%SERVER%:8172/msdeploy.axd?site=%WEBSITE%",UserName='%USER%',Password='%PASSWORD%',AuthType='Basic' -allowUntrusted
GOTO END

:NOMSBUILD
ECHO MSDeploy not found.  Check to make sure the path is correct
exit /b 1

:ERROR
ECHO Error building the source code. 
exit /b 2
 
:END