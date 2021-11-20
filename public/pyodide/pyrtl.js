var Module=typeof globalThis.__pyodide_module!=="undefined"?globalThis.__pyodide_module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH="";if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof process==="undefined"&&typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var PACKAGE_NAME="pyrtl.data";var REMOTE_PACKAGE_BASE="pyrtl.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){if(false){require("fs").readFile(packageName,function(err,contents){if(err){errback(err)}else{callback(contents.buffer)}});return}var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.9",true,true);Module["FS_createPath"]("/lib/python3.9","site-packages",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","pyrtl",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/pyrtl","rtllib",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","tests",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","pyrtl-0.10.0-py3.9.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:445674,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,791,1729,3195,4378,5757,6834,8233,9539,10810,12215,13491,14854,16322,17738,19029,20246,21316,22473,23682,24949,25962,26664,27422,28255,29322,30133,31346,32490,33587,34903,36306,37536,38718,39809,40949,42205,43138,44078,45051,46377,47793,49223,50473,51598,52714,53920,55254,56407,57620,58693,59603,60375,61235,62644,63922,65196,66404,67813,69108,70389,71591,72651,73562,74861,76244,77581,78926,80235,81201,82241,83531,84769,86196,87446,88707,90195,91380,92716,93944,95404,96543,97623,98920,100188,101397,102443,103608,104812,106052,107359,108811,109980,111388,112412,113498,114688,115691,116282,117485,118643,120002,121066,122218,123249,124509,125751,126921,128206,128975,129409,130356,131163,132416,133209,134593,135856,137224,138478,139544,140807,142145,143030,144285,145554,146811,147975,149055,150367,151652,152809,154259,155595,156484,157650,158762,160039,161295,162574,163884,165147,166300,167464,168609,169853,170934,172175,173312,174701,175816,177089,178306,179377,180596,181719,182606,183644,184874,186136,187421,188588,189821,191068,192186,193508,194849,195982,197075,198153,199408,200829,202116,203446,204724,205713,206836,207942,209177,210589,211957,213234,214452,215735,217069,218368,219487,220429,221279,221857,222941,224220,225209,226305,227649,229023,230110,231561,232744,234163,235432,236557,237867,239229,240286,241471,242532,243534,245086,246327,247850,249463,250975,252372,253687,254812,255707,256874,257943,258684,259674,260655,261444,262494,263365,264309,265313,266288,267465,268708,269504,270648,271592,272612,273665,274722,275677,276706,277740,278923,280337,281764,283107,284336,285713,286932,288257,289494,290804,291981,292690,294028,295482,296878,298107,299287,300446,301523,302404,303424,304347,305194,306408,307035,307994,308667,309838,310867,311476,312030,312802,313888,314858,315675,316625,317442,318493,319525,320461,321481,322535,323780,324281,325015,325903,326601,327212,327805,328502,329505,330311,331038,332059,333018,333769,334443,335299,335994,336706,337596,338499,339400,340195,341219,341930,342603,343027,343728,344332,345084,345652,346483,347262,348028,349099,349873,350844,351881,352466,353465,354357,355261,356190,357131,358049,359096,360318,361292,361948,362801,363786,364533,365545,366432,367280,368090,369104,369916,370521,371077,371601,372337,373118,373699,374696,375990,377147,378165,379440,380774,382019,383289,384346,385258,386036,386902,387849,388830,389609,390486,391518,392292,393219,394289,394970,395692,396665,397483,398237,399061,399897,400889,401717,402665,403623,404443,405301,406210,407077,407962,409074,409854,410569,411210,412259,413324,414390,415473,416095,416739,417428,418492,419525,420352,421256,422261,423341,424391,425146,426139,427038,428119,429187,430212,431015,431941,433017,433707,434911,435733,436410,437124,438191,439263,440357,441054,441752,442519,443186,443923,445040],sizes:[791,938,1466,1183,1379,1077,1399,1306,1271,1405,1276,1363,1468,1416,1291,1217,1070,1157,1209,1267,1013,702,758,833,1067,811,1213,1144,1097,1316,1403,1230,1182,1091,1140,1256,933,940,973,1326,1416,1430,1250,1125,1116,1206,1334,1153,1213,1073,910,772,860,1409,1278,1274,1208,1409,1295,1281,1202,1060,911,1299,1383,1337,1345,1309,966,1040,1290,1238,1427,1250,1261,1488,1185,1336,1228,1460,1139,1080,1297,1268,1209,1046,1165,1204,1240,1307,1452,1169,1408,1024,1086,1190,1003,591,1203,1158,1359,1064,1152,1031,1260,1242,1170,1285,769,434,947,807,1253,793,1384,1263,1368,1254,1066,1263,1338,885,1255,1269,1257,1164,1080,1312,1285,1157,1450,1336,889,1166,1112,1277,1256,1279,1310,1263,1153,1164,1145,1244,1081,1241,1137,1389,1115,1273,1217,1071,1219,1123,887,1038,1230,1262,1285,1167,1233,1247,1118,1322,1341,1133,1093,1078,1255,1421,1287,1330,1278,989,1123,1106,1235,1412,1368,1277,1218,1283,1334,1299,1119,942,850,578,1084,1279,989,1096,1344,1374,1087,1451,1183,1419,1269,1125,1310,1362,1057,1185,1061,1002,1552,1241,1523,1613,1512,1397,1315,1125,895,1167,1069,741,990,981,789,1050,871,944,1004,975,1177,1243,796,1144,944,1020,1053,1057,955,1029,1034,1183,1414,1427,1343,1229,1377,1219,1325,1237,1310,1177,709,1338,1454,1396,1229,1180,1159,1077,881,1020,923,847,1214,627,959,673,1171,1029,609,554,772,1086,970,817,950,817,1051,1032,936,1020,1054,1245,501,734,888,698,611,593,697,1003,806,727,1021,959,751,674,856,695,712,890,903,901,795,1024,711,673,424,701,604,752,568,831,779,766,1071,774,971,1037,585,999,892,904,929,941,918,1047,1222,974,656,853,985,747,1012,887,848,810,1014,812,605,556,524,736,781,581,997,1294,1157,1018,1275,1334,1245,1270,1057,912,778,866,947,981,779,877,1032,774,927,1070,681,722,973,818,754,824,836,992,828,948,958,820,858,909,867,885,1112,780,715,641,1049,1065,1066,1083,622,644,689,1064,1033,827,904,1005,1080,1050,755,993,899,1081,1068,1025,803,926,1076,690,1204,822,677,714,1067,1072,1094,697,698,767,667,737,1117,634],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_pyrtl.data")}Module["addRunDependency"]("datafile_pyrtl.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.9/site-packages/pyrtl/__init__.py",start:0,end:4269,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/analysis.py",start:4269,end:25326,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/compilesim.py",start:25326,end:60043,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/conditional.py",start:60043,end:72555,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/core.py",start:72555,end:116966,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/corecircuits.py",start:116966,end:146537,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/helperfuncs.py",start:146537,end:185520,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/importexport.py",start:185520,end:234184,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/memory.py",start:234184,end:249826,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/passes.py",start:249826,end:282623,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/pyrtlexceptions.py",start:282623,end:283092,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/simulation.py",start:283092,end:335550,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/transform.py",start:335550,end:347380,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/visualization.py",start:347380,end:369573,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/wire.py",start:369573,end:399777,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/__init__.py",start:399777,end:399777,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/adders.py",start:399777,end:410699,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/aes.py",start:410699,end:430660,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/barrel.py",start:430660,end:432494,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/libutils.py",start:432494,end:435865,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/matrix.py",start:435865,end:490418,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/multipliers.py",start:490418,end:500369,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/muxes.py",start:500369,end:507607,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/prngs.py",start:507607,end:518881,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl/rtllib/testingutils.py",start:518881,end:524341,audio:0},{filename:"/lib/python3.9/site-packages/tests/__init__.py",start:524341,end:524341,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_analysis.py",start:524341,end:532701,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_compilesim.py",start:532701,end:572511,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_conditional.py",start:572511,end:591846,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_core.py",start:591846,end:617715,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_examples.py",start:617715,end:618452,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_helperfuncs.py",start:618452,end:664410,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_importexport.py",start:664410,end:719207,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_memblock.py",start:719207,end:734681,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_passes.py",start:734681,end:768086,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_signed.py",start:768086,end:775627,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_simulation.py",start:775627,end:817942,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_transform.py",start:817942,end:832164,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_visualization.py",start:832164,end:845082,audio:0},{filename:"/lib/python3.9/site-packages/tests/test_wire.py",start:845082,end:857192,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl-0.10.0-py3.9.egg-info/PKG-INFO",start:857192,end:858218,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl-0.10.0-py3.9.egg-info/SOURCES.txt",start:858218,end:859278,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl-0.10.0-py3.9.egg-info/dependency_links.txt",start:859278,end:859279,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl-0.10.0-py3.9.egg-info/requires.txt",start:859279,end:859309,audio:0},{filename:"/lib/python3.9/site-packages/pyrtl-0.10.0-py3.9.egg-info/top_level.txt",start:859309,end:859321,audio:0}],remote_package_size:449770,package_uuid:"973bc9eb-bb54-41ad-ae91-072dcf47537e"})})();