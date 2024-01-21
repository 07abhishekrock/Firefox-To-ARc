rm -Rf tab-sidebar-zip*
rm -Rf tab-sidebar.zip
mkdir -p tab-sidebar-zip
cp ./background-script.js tab-sidebar-zip
cp ./README.md tab-sidebar-zip
cp ./manifest.json tab-sidebar-zip

cp -r ./icons/ tab-sidebar-zip

mkdir -p tab-sidebar-zip/sidebar-src
cp -r sidebar-src/dist tab-sidebar-zip/sidebar-src/dist


