#!/bin/bash
if [ ! -d tmp ]; then
    mkdir tmp
fi
if [ ! -d tmp/examples ]; then
    mkdir tmp/examples
fi
cp schema/examples/* tmp/examples
cp /dev/null tmp/schemaOptionsDev
cp /dev/null tmp/schemaOptionsProd
for file in schema/*.json
do
    fileName=$(echo $file | cut -d'/' -f 2 )
    schemaName=$(echo $fileName | cut -d'.' -f 1)
    sed "/\"id\" : \"$schemaName:/d" $file >tmp/$fileName
    sedCommand=$(echo '/"$schema": "http:\/\/json-schema.org\/draft-04\/schema#"/r templates')
    sed -i "$sedCommand/$schemaName" tmp/$fileName
    echo "<option value=\"tmp/$fileName\">$schemaName</option>" >> tmp/schemaOptionsDev
    echo "<option value=\"schemas/$fileName\">$schemaName</option>" >> tmp/schemaOptionsProd
done
# Add schemaOptions in select list
optionNumber=$(grep -E '<option value=\"tmp/' dev.html | wc -l)
if [ $optionNumber -eq 0 ]; then
    sed -i '/<select id="schemaSelector">/r tmp/schemaOptionsDev' dev.html
fi
if [ -d prod ]; then
    find prod -name "index.html" -type f -exec sed -i '/<select id="schemaSelector">/r tmp/schemaOptionsProd' {} \;
fi