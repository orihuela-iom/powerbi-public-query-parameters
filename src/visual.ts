/* Permite usar parametros de filtro en url en informe publicos de pbi 
Ejemplo: 
https://app.powerbi.com/view?r=eyJrI...&columna is 5&columna2 In ('A')

Operadores soportados:
in|is|notin|lessthan|lessthanorEqual|greaterthan|greaterthanorequal|contains|doesnotcontain|startswith|doesnotstartwith
*/

"use strict";
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import * as models from 'powerbi-models';
import {urlParser, FilterResult} from './parser';



export class Visual implements IVisual {
    private host: IVisualHost;
    private filterApplied: boolean = false;
    private queryParamName;


    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        //this.testFilter();
    }

    public testFilter(){
        const basicFilter = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {table: "Hoja2", 
                     column: "Municipio"},
            operator: "In",
            values: ["TOLUCA"],
            filterType:models.FilterType.Basic
        };
        this.host.applyJsonFilter(basicFilter, "general", "filter", powerbi.FilterAction.merge);
        console.log("algo aqui")
    }


    public constructAdvancedFilter (parsedFilter: FilterResult, tableName: string){

        const advacedFilter = {
            target: {table: tableName, column: parsedFilter.column},
            logicalOperator: "And",
            conditions: [{operator: parsedFilter.condition, value: parsedFilter.values}],
            filterType:models.FilterType.Advanced
        };
        return advacedFilter;
    }


    public constructBasicFilter(parsedFilter: FilterResult, tableName: string) {

        const basicFilter = {
                    $schema: "http://powerbi.com/product/schema#basic",
                    target: {table: tableName, 
                             column: parsedFilter.column},
                    operator: parsedFilter.condition,
                    values: parsedFilter.values,
                    filterType:models.FilterType.Basic
            };
        return basicFilter;
    }


    public applyFilters(options: VisualUpdateOptions){
        // parametros url
        const urlParams = new urlParser(document.referrer);
        const filterParam = urlParams.getParameter(options.dataViews[0].categorical.categories[0].source.displayName);
        if (!filterParam) {return;}


        const dataView: DataView = options.dataViews[0];
        const categories: powerbi.DataViewCategoricalColumn = dataView.categorical.categories[0];
        const tableName = categories.source.queryName.split('.')[0];
        
        let filterToApply = {};

        if (filterParam.filterType === "Advanced"){
            filterToApply = this.constructAdvancedFilter(filterParam, tableName);
        }else if (filterParam.filterType === "Basic"){
            filterToApply = this.constructBasicFilter(filterParam, tableName);
        }
        console.log(filterToApply);
        this.host.applyJsonFilter(filterToApply, "general", "filter", powerbi.FilterAction.merge);

    }

    public applyFiltersFromUrl(options: VisualUpdateOptions) {

        // parametros url
        const urlParams = new URLSearchParams(document.referrer);
        const filterValue = urlParams.get(options.dataViews[0].categorical.categories[0].source.displayName);
        if (!filterValue) {return;}


        const dataView: DataView = options.dataViews[0];
        const categories: powerbi.DataViewCategoricalColumn = dataView.categorical.categories[0];
        const columnName = categories.source.displayName;

        const filterValues = filterValue.split(",").map(decodeURIComponent);

        const basicFilter = {
                $schema: "http://powerbi.com/product/schema#basic",
                target: {table: categories.source.queryName.split('.')[0], 
                         column: columnName},
                operator: "In",
                values: filterValues,
                filterType:models.FilterType.Basic
        };
    
        this.host.applyJsonFilter(
                basicFilter, 
                "general", 
                "filter", 
                powerbi.FilterAction.merge
        );


    }

    public update(options: VisualUpdateOptions) {

        // Aplicar filtro inicial
        if (options.dataViews && options.dataViews[0] && !this.filterApplied) {
            this.applyFilters(options);
            this.filterApplied = true;
        }
    }
}