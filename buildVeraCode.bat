@ECHO OFF 
set ERRORLEVEL=0
 
set MSBPATH="C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin\msbuild.exe"
set MSBPATHPRECOM="C:\Windows\Microsoft.NET\Framework\v4.0.30319\aspnet_compiler.exe"
set ZPATH="C:\Program Files\7-Zip\7z.exe"
 
ECHO Checking for MSBuild...
IF NOT EXIST %MSBPATH% GOTO NOMSBUILD 
IF NOT EXIST %MSBPATHPRECOM% GOTO NOMSBUILD 

%MSBPATH% Build.proj /flp:logfile=BuildLog.txt /p:VisualStudioVersion=15.0 /p:Configuration=Debug /m || GOTO ERROR
%MSBPATHPRECOM% -p "./FrontEnd/Infor.Sxe.Web.FrontEnd" -v "Infor.Sxe.Web.FrontEnd/" -fixednames -f -c -d "./PrecompiledWeb/Infor.Sxe.Web.FrontEnd" || GOTO ERROR
DEL .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\*.xml
DEL .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\*.COMPILED
DEL .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\*.config

%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\*.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip -xr!lib

%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\excel\jszip.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\excel\shim.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\excel\xlsx.full.min.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\excel\filesaver.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\jquery\dist\jquery-3.1.1.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\jquery-json\src\jquery.json.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular\angular.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-cookies\angular-cookies.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-sanitize\angular-sanitize.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-route\angular-route.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-translate\angular-translate.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-translate-loader-static-files\angular-translate-loader-static-files.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\angular-ui-router\release\angular-ui-router.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\ui-router-extras\release\modular\ct-ui-router-extras.core.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\ui-router-extras\release\modular\ct-ui-router-extras.sticky.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\ui-router-extras\release\modular\ct-ui-router-extras.dsr.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\jslinq\JSLINQ.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\topaz\sig-web-tablet.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\ng-focus-if\focusIf.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\soho\js\sohoxi.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\soho\vendor\d3.min.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 
%ZPATH% a -r -i!.\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\ui\lib\infor-companyon-client\infor-companyon-client.js .\PrecompiledWeb\Infor.Sxe.Web.FrontEnd\bin\ui.zip 

GOTO END

:NOMSBUILD
ECHO MSBuild not found.  Check to make sure the path is correct
exit /b 1

:ERROR
ECHO Error building the source code. 
exit /b 2 

:END 
 