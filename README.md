# Quasar App (pwa-news)

A Quasar Framework app
User: burri@cornio.com
Password: 123456

## Go to JSON-SERVER direcctory
```bash
   cd json-server
```

## Launch server
```bash
json-server --watch db.json --port 4000 --middlewares auth.js
```

## Go to PWA app code direcctory
```bash
   cd pwa-news
```

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m pwa
(quasar dev if not is a PWA)
```


### Build the app for production
```bash
quasar build -m pwa
(quasar build if not is a PWA)
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
