# Notas de compilación — Trivia Multiplicación

## APK listo para instalar

```
C:\trivia\app-release.apk
```

(es una copia del original en `android\app\build\outputs\apk\release\app-release.apk`)

- **Paquete:** `com.triviamultiplicacion.app`
- **Versión:** 1.0.0 (versionCode 1)
- **Android mínimo:** 7.0 (API 24)
- **Compatible con:** arm64-v8a, armeabi-v7a, x86, x86_64
- **Tamaño:** ~77 MB (incluye las 4 arquitecturas)

### Instalación en el teléfono
1. Copia `app-release.apk` al teléfono (cable, Drive, Telegram…).
2. Activa "Instalar apps de origen desconocido" para la app desde la que lo abras.
3. Abre el archivo y toca **Instalar**.

---

## Cómo volver a compilar

Doble clic en **`build-apk.cmd`** (o `npm run build:apk`). El script:

1. Configura `JAVA_HOME` (JBR de Android Studio) y `ANDROID_HOME`.
2. Ejecuta `gradlew assembleRelease`.
3. Copia el APK a la raíz del proyecto como `app-release.apk`.

Para un APK más pequeño (solo teléfonos modernos de 64 bits, ~25-30 MB):

```
build-apk.cmd -PreactNativeArchitectures=arm64-v8a
```

---

## ¿Por qué el proyecto está en `C:\trivia`?

Windows limita las rutas a **260 caracteres**. La compilación de C++ de la nueva
arquitectura de React Native genera rutas espejo de `node_modules` que, desde
`C:\Users\Ashley\test2\trivia-multiplicacion`, superaban ese límite:

```
ninja: error: Filename longer than 260 characters
```

Se movió el proyecto a `C:\trivia` para reducir la ruta. **No lo muevas a una
carpeta con nombre largo** o el build volverá a fallar.

## ninja actualizado (importante)

El CMake 3.22.1 del SDK de Android incluye **ninja 1.10.2**, que no soporta rutas
de más de 260 caracteres (segundo error: `mkdir(...): No such file or directory`).
Se reemplazó por **ninja 1.13.2**:

```
C:\Users\Ashley\AppData\Local\Android\Sdk\cmake\3.22.1\bin\ninja.exe      <- 1.13.2
C:\Users\Ashley\AppData\Local\Android\Sdk\cmake\3.22.1\bin\ninja-1.10.2.bak.exe  <- respaldo
```

Si algún día se reinstala el SDK/CMake, hay que repetir este reemplazo:

1. Descargar https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-win.zip
2. Copiar el `ninja.exe` extraído sobre `...\Sdk\cmake\3.22.1\bin\ninja.exe`.

## Entorno usado

| Herramienta | Ruta / versión |
|---|---|
| JDK | `C:\Program Files\Android\Android Studio\jbr` (OpenJDK 25) |
| Android SDK | `C:\Users\Ashley\AppData\Local\Android\Sdk` |
| Gradle | 9.4.1 (wrapper del proyecto) |
| compileSdk / targetSdk | 37 / 36 |

## Firma

El APK está firmado con la **keystore de debug** (configurada en
`android\app\build.gradle`), así que se puede instalar por sideload, pero
**no sirve para publicar en Google Play**. Para Play Store hay que generar una
keystore propia y configurar `signingConfigs.release`.
