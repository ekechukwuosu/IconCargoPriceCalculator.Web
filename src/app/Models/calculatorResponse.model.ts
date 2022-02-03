export class CalculatorResponse {
    calculatedDimension!: number;
    calculatedPrice! :number;

    clear() {
        this.calculatedDimension = 0;
        this.calculatedPrice = 0;
    }
}


