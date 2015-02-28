sh build.sh

echo "Copying resources to dependent projects/"

cp -f ../bin/ku4js-reflection.js ../../ku4js-reflection/tests/_dependencies/
cp -f ../bin/ku4js-reflection.js ../../ku4js-workers/tests/_dependencies/
cp -f ../bin/ku4js-reflection.js ../../ku4js-workers/example/scripts/example/lib/
cp -f ../bin/ku4js-reflection.js ../../ku4js-webApp/tests/_dependencies/
cp -f ../bin/ku4js-reflection.js ../../ku4js-webApp/_example/javascript/lib/
cp -f ../bin/ku4js-reflection.js ../../ku4js-webApp/_TEMPLATE/lib/

echo "Copying resources to _LATEST/"
cp -f ../bin/ku4js-reflection.js ../../_LATEST/

echo "Update complete :{)}"