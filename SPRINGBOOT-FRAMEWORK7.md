# Pasos para configurar Spring Boot + Framework 7 

### 1. Crear un proyecto con https://start.spring.io/
Seleccionar:
	Maven,
	Spring Web,
	Spring Boot Dev Tools

### 2. Instalar **framework7** en el sistema de manera global.

### 3. Dentro del proyecto, crear el directorio frontend y con una consola entrar a esa ubicación.

### 4. Crear un proyecto en framework7 con el comando:
	> framework7 create (elegir opcion 3, tabs para este ejemplo)
	> npm i
	> npm run dev (esto para verificar que se creó correctamente)

### 5. Vamos a pegar el siguiente plugin para poder agregar al ciclo de compilación de maven
la posibilidad de correr comandos npm.

```xml
		    <plugin>
                <groupId>com.github.eirslett</groupId>
                <artifactId>frontend-maven-plugin</artifactId>
                <version>1.12.1</version>
                <configuration>
                    <workingDirectory>frontend</workingDirectory>
                    <installDirectory>target</installDirectory>
                </configuration>
                <executions>
                    <execution>
                        <id>install node and npm</id>
                        <goals>
                            <goal>install-node-and-npm</goal>
                        </goals>
                        <configuration>
                            <nodeVersion>v16.15.1</nodeVersion>
                            <npmVersion>8.13.1</npmVersion>
                        </configuration>
                    </execution>
                    <execution>
                        <id>npm install</id>
                        <goals>
                            <goal>npm</goal>
                        </goals>
                        <configuration>
                            <arguments>install</arguments>
                        </configuration>
                    </execution>
                    <execution>
                        <id>npm run build</id>
                        <goals>
                            <goal>npm</goal>
                        </goals>
                        <configuration>
                            <arguments>run build-dev</arguments>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```

### 6. Agregar al **vite.config.js**

```cmd
const BUILD_DIR = path.resolve(__dirname, '../target/classes/static');
```
Para crear la carpeta static en classes del target.

### 7. Instalar axios
```
npm i axios
```

### 8. Agregar una page persona que busque al backend una persona por medio de un service.js


### **La page persona.jsx**

```javascript
import React, { useEffect, useState } from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';
import personaService from '../service/personaService';

function Persona() {

    const [persona, setPersona] = useState('');

    useEffect(() => {
        buscarPersona();
    }, []);

    const buscarPersona = async () => {
        const persona = await personaService.buscarPersona();
        setPersona(persona);
    }

    return <Page>
        <Navbar title="Persona" backLink="Back" />
        <BlockTitle>Persona</BlockTitle>
        <Block strong>
            <p>{persona.nombre}</p>
            <p>{persona.edad}</p>
        </Block>
    </Page>


}

export default Persona;
```

### **service/persoaService.js**

```javascript
import axios from "axios";

const personaService = {

    buscarPersona: async () => {
        const response = await axios.get('/api/persona');
        return response.data;
    }

}

export default personaService;
```

### 9. En SpringBoot crear un rest controller que devuelva una persona mock

### **El rest controller**

```java
@RestController
public class PersonaRestController {

    @GetMapping("/api/persona")
    public Persona buscarPersona() {
        Persona persona = new Persona();
        persona.setNombre("Federico");
        persona.setEdad("30");
        return persona;
    }

}
```

### **El dominio persona**

```java
public class Persona {

    private String nombre;
    private String edad;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEdad() {
        return edad;
    }

    public void setEdad(String edad) {
        this.edad = edad;
    }

}
```

### 10. Agregar la page al home de Framework7 para que se pueda acceder con un click

En **src/js/routes.js**

En el array routes agregar:

```javascript
  {
    path: '/persona/',
    component: Persona,
  },
```
En **src/components/app.jsx** Agregar

```jsx
<Link tabLink="#view-persona" iconIos="f7:goes" iconAurora="f7:goes"  iconMd="material:safe" text="Persona"/>
```
y

```jsx
<View id="view-persona" name="settings" tab url="/persona/" />
```


### 11. Levantar el proyecto desde SpringBoot. Si queremos realizar un cambio enel frontend debemos hacer este paso siempre, para que por medio del ciclo de vida de maven se pueda recompilar y copiar cada vez el resultado al **target/classes** generado por maven.

### 12. Para poder editar el frontend sabiendo que el backend nos va a enviar el mismo json y queremos ver los cambios en el momento, sin la necesidad de crear una nueva compilación de maven. Podemos ejecutar el proyecto frontend con npm run dev pero este se levantará en un puerto que no es el que tenemos en el backend, para solucionar este problema podemos hacer un proxy para que las peticiones que se realizen a /api/ en en localhost en el puerto del frontend sea redirigido al puerto del backend y así poder tener la respuesta del backend mientras hacemos cambios en el front en el momento.

Para esto agregamos el siguiente bloque en **vite.config.js**
En el key **server**

```json
proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
```

## Fin.