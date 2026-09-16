#!/usr/bin/env bash
# Keystore Generation Script for niooo Chat
set -e

KEY_FILE="${1:-my-upload-key.jks}"
ALIAS="${2:-upload}"
PASSWORD="${3:-nutritrack123}"
CN="${4:-niooo Chat}"
ORG="${5:-niooonucc}"

echo "Generating Keystore: $KEY_FILE (alias: $ALIAS)..."

if command -v keytool &>/dev/null; then
  keytool -genkey -v \
    -keystore "$KEY_FILE" \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$PASSWORD" \
    -keypass "$PASSWORD" \
    -dname "CN=$CN, OU=$ORG, O=$ORG, C=US"
elif command -v openssl &>/dev/null; then
  TEMP_KEY=$(mktemp)
  TEMP_CERT=$(mktemp)
  openssl req -x509 -newkey rsa:2048 -keyout "$TEMP_KEY" -out "$TEMP_CERT" -days 10000 -nodes -subj "/CN=$CN/OU=$ORG/O=$ORG/C=US"
  openssl pkcs12 -export -in "$TEMP_CERT" -inkey "$TEMP_KEY" -out "$KEY_FILE" -name "$ALIAS" -passout "pass:$PASSWORD"
  rm -f "$TEMP_KEY" "$TEMP_CERT"
else
  echo "Error: Neither keytool nor openssl found."
  exit 1
fi

echo "Keystore generated successfully at $KEY_FILE"
