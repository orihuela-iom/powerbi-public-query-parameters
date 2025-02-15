# Custom Visual - Query string paramerter for Power BI public URL

Permite aplicar filtros desde la URL de un informe público. Esto facilita compartir informes prefiltrados.

## 🚀 Características
- Extrae filtros desde la URL del informe público de Power BI.
- Soporta filtros con operadores `In`, `NotIn`,`Is`, `LessThan`, `LessThanOrEqual`, `GreaterThan`, `GreaterThanOrEqual`, `Contains`, `DoesNotContain`, `StartsWith`, `DoesNotStartWith`.
- Soporta filtros en multiples columna, separados por `&`.



## 📌 Ejemplo de Uso
Dado un informe público con la siguiente URL:
```plaintext
https://app.powerbi.com/view?r=XXXX&columna1 Is 5&columna2 In ('A', 'B')
```
Este **Custom Visual** aplicará los siguientes filtros:
- `columna1 = 5`
- `columna2 IN ('A', 'B')`


## 📥 Instalación
1. Descarga el archivo `.pbiviz`.
2. Abre Power BI Desktop.
3. Ve a la sección **Vizualizaciones > ... > Importar un objeto visual desde archivo** y selecciona el `.pbiviz`.


## 🛠️ Configuración
1. Agrega el **Custom Visual** al lienzo de Power BI.
2. Agrega el visual al informe y asigna la columna por la cual se quiere filtrar.
3. Si deseas agrear un filtro extra para otra columna repite el paso 1 y 2.
4. Asegúrate de que las columnas mencionadas en la URL existen en el modelo de datos.
5. Verifica que los valores sean compatibles con los tipos de datos en Power BI.


## 🎯 Consideraciones
- Soporta 1 filtro por columna.
- Se deben cargar todos los elementos del informe y después se aplican los filtros.
- La URL debe ser de un informe publico.
- Los nombres de las columnas en la URL deben coincidir con los del modelo de datos.
- La sintaxis de los filtros en la URL debe seguir la estructura soportada (`Is`, `In`, etc.).


## Contacto
[act.orihuela@gmail.com](mailto:act.orihuela@gmail.com).

