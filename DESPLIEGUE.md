# Guía de Despliegue wz-Maestro en Cloud Foundry

## 1. Compilación Local

### Verificar Prerequisites
```bash
node --version  # >= 16.x
npm --version   # >= 8.x
```

### Instalar Dependencias
```bash
npm install
```

### Probar Localmente
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:8080/index.html`

### Compilar para Producción
```bash
npm run build
```

Esto genera los archivos optimizados en `dist/`

## 2. Despliegue en Cloud Foundry

### Opción A: Usando MTA (Recomendado)

#### 2.1 Instalar MTA Build Tool
```bash
npm install -g mta
```

#### 2.2 Construir MTA
```bash
mbt build -m mta.yaml -d dist
```

Esto genera: `dist/app.maestro_1.0.0.mtar`

#### 2.3 Desplegar en CF
```bash
# Primero, iniciar sesión en CF
cf login -a <CF_API_URL>

# Desplegar el MTA
cf deploy dist/app.maestro_1.0.0.mtar -f
```

#### 2.4 Verificar Despliegue
```bash
cf apps  # Ver lista de aplicaciones

# Debería mostrar algo como:
# app-maestro    started    1/1    256M    512M

# Ver logs
cf logs app-maestro --recent
```

### Opción B: Despliegue Directo (Alternativa)

Si prefieres no usar MTA:

```bash
cf login -a <CF_API_URL>
cf push app-maestro --buildpack=staticfile_buildpack -p webapp/dist
```

## 3. Configuración en Cloud Foundry

### Variables de Entorno
Si necesitas configurar la aplicación después del despliegue:

```bash
cf set-env app-maestro API_URL "https://api.example.com"
cf set-env app-maestro TENANT "PALTARUMI"
cf restage app-maestro
```

### Mapear Dominio Personalizado
```bash
# Si deseas usar un dominio personalizado
cf map-route app-maestro <custom-domain> --hostname app-maestro
```

## 4. Integración con Work Zone

Para que la aplicación funcione en SAP Build Work Zone:

1. **Obtener la URL de despliegue**:
```bash
cf apps | grep app-maestro
# URL: https://app-maestro.<cf-domain>.com
```

2. **Registrar en Work Zone**:
   - Ir a Work Zone Administration
   - Agregar nueva aplicación HTML5
   - URL: `https://app-maestro.<cf-domain>.com`
   - AppID: `app.maestro`
   - Título: "Maestros"

3. **Configurar Seguridad** (xs-security.json):
   - La app incluye xs-security.json básico
   - Ajusta roles y permisos según necesidad

## 5. Troubleshooting

### Error: "Cannot find module 'xlsx'"
```bash
npm install
npm run build
```

### Error: "Cloud Foundry connection failed"
```bash
cf login -a <CF_API_URL>  # Reconectar
```

### Ver Logs en Tiempo Real
```bash
cf logs app-maestro
# O logs recientes
cf logs app-maestro --recent
```

### Eliminar Aplicación Desplegada
```bash
cf delete app-maestro -f
```

### Ver Detalles de la Aplicación
```bash
cf app app-maestro
# Ver variables de entorno
cf env app-maestro
```

## 6. URLs Importantes

| Recurso | URL |
|---------|-----|
| App Local | http://localhost:8080 |
| CF Login | <CF_API_URL> |
| App Desplegada | https://app-maestro.<cf-domain>.com |
| Work Zone | https://paltarumi.launchpad.workzone.com |

## 7. Verificación Final

### Checklist Pre-Despliegue
- [ ] npm install completado sin errores
- [ ] npm run build completado exitosamente
- [ ] Prueba local funciona (npm start)
- [ ] CF CLI instalado y logueado
- [ ] MTA build tool instalado

### Checklist Post-Despliegue
- [ ] cf apps muestra app-maestro como "started"
- [ ] URL de la app es accesible
- [ ] Sin errores en cf logs
- [ ] Datos maestros se cargan correctamente
- [ ] Búsqueda funciona

## Notas

- **Data Estática**: La aplicación actualmente usa data hardcodeada. Para usar APIs reales, edita:
  ```javascript
  // app/Maestro/constantes.js
  ActivarMockData: false  // Cambiar de true
  ```

- **Caché**: Si no ves cambios después del despliegue, limpia caché del navegador o usa Ctrl+Shift+R

- **Acceso**: La app requiere estar autenticado en CF. Se autentica automáticamente vía XSUAA.

## Documentación Adicional

- [SAP UI5 Docs](https://ui5.sap.com)
- [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/)
- [SAP BTP Documentation](https://help.sap.com/viewer/product/BTP/LATEST)
