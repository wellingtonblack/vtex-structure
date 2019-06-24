export interface IController {
    OnDestroy(): void;
    OnOrderFormChange(order: any): void;
    OnInit(): void;
}