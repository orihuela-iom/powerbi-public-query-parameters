# Custom Visual - Query string parameters in publish to web power bi report URL 

Allows applying filters from the URL of a public report. This makes it easier to share pre-filtered reports.

## 🚀 Features
- Extracts filters from the URL of a Power BI public report.
- Supports filters with the following operators: `In`, `NotIn`, `Is`, `LessThan`, `LessThanOrEqual`, `GreaterThan`, `GreaterThanOrEqual`, `Contains`, `DoesNotContain`, `StartsWith`, `DoesNotStartWith`.
- Supports filters on multiple columns, separated by `&`.

## 📌 Usage Example
Given a public report with the following URL:
```plaintext
https://app.powerbi.com/view?r=XXXX&column1 Is 5&column2 In ('A', 'B')
```
This **Custom Visual** will apply the following filters:
- `column1 = 5 AND column2 IN ('A', 'B')`

## 📥 Installation
1. Download the `.pbiviz` file.
2. Open Power BI Desktop.
3. Import Custom visual.

## 🛠️ Configuration
1. Add the **Custom Visual** to the Power BI canvas.
2. Add the visual to the report and assign the column to filter by.
3. If you want to add an extra filter for another column, repeat steps 1 and 2.
4. Ensure that the columns mentioned in the URL exist in the data model.
5. Verify that the values are compatible with the data types in Power BI.

## 🎯 Considerations
- Supports one filter per column.
- All report elements must be loaded before the filters are applied.
- The URL must be from a public report.
- Column names in the URL must match those in the data model.
- The filter syntax in the URL must follow the supported structure (`Is`, `In`, etc.).



## Español


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
- `columna1 = 5 AND columna2 IN ('A', 'B')`


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




