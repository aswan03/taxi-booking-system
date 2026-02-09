#!/bin/bash
# Start script for Railway/Render deployment

# Try to find the JAR file
JAR_FILE=$(find target -name "*.jar" -type f | head -n 1)

if [ -f "$JAR_FILE" ]; then
    echo "Found JAR file: $JAR_FILE"
    java -jar "$JAR_FILE"
else
    echo "JAR file not found, using Maven to run..."
    mvn spring-boot:run
fi
