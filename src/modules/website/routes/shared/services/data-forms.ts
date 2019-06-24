import { CentralDeAjuda } from "../models/forms.model";

class DataForms {

    public centralDeAjuda(formData: CentralDeAjuda): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `/api/dataentities/CJ/documents`,
                type: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(formData),
                success: (data) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

}

export default new DataForms();