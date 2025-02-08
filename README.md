# MovieHub - Kaynak Kod

Bu repo, MovieHub uygulamasının kaynak kodunu içerir. Uygulamayı çalıştırmak için aşağıdaki adımları izleyin:

## Kurulum Adımları

1. Yeni bir React Native projesi oluşturun:
```bash
npx react-native init MovieHub --template react-native-template-typescript
```

2. Gerekli paketleri yükleyin:
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-paper react-native-vector-icons
npm install @reduxjs/toolkit react-redux
npm install react-native-safe-area-context react-native-screens
```

3. Bu repo'daki `src` klasörünü, oluşturduğunuz projenin kök dizinine kopyalayın.

4. Android için `android/app/build.gradle` dosyasına ekleyin:
```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

5. Uygulamayı başlatın:
```bash
npm start
```

## Demo Video
[Demo video linki]

## APK Dosyası
[APK dosyası linki]

## Özellikler
- Film listesi görüntüleme ve arama
- Film detayları inceleme
- Favori filmleri kaydetme
- Film paylaşımı
- Bottom tab navigation

## Kullanılan Teknolojiler
- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- React Native Paper
