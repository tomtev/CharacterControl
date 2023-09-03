#!/bin/bash

X=-250
Y=-250
while [ $X -le 400 ]
do
  while [ $Y -le 600 ]
  do
    filename="chunk${X}-${Y}-lvl-1"
    if [[ -f "./maps/${filename}.obj" ]]; then
      obj2gltf -i "./maps/${filename}.obj" -o "./maps/${filename}.glb" &
      echo "Converting ${filename}.obj to ${filename}.glb"
    fi
    Y=$((Y+25))
  done
  Y=-250
  X=$((X+25))

  # Wait for obj2gltf to finish before starting the next batch
  echo "Waiting for obj2gltf to finish"
  wait
  sleep 1
done

# Use find and xargs to run gltfjsx in parallel with a maximum of 8 processes
find ./maps -name "*.glb" -print0 | xargs -0 -P 8 -I{} sh -c 'npx gltfjsx "{}" --transform --resolution --shadows -o "{}-transformed.glb" && rm "{}"'

# Delete unnecessary files
find ./maps -name "*-RGBA.png" -delete
find ./maps -name "*-RGB.png" -delete
find ./maps -name "*-Alpha.png" -delete
find ./maps -name "*.mtl" -delete

echo "Done"
