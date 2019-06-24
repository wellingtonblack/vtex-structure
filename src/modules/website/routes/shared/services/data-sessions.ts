import { Session } from "../models/session";

class DataSessions {
    get sessions() {
        return new Promise<Session>((resolve, reject) => {
            const session: any = localStorage.getItem("session");
            if (!session) {
                $.ajax({
                    type: "GET",
                    url: `/api/sessions?items=*`,
                    success: (data: Session) => {
                        localStorage.setItem("session", JSON.stringify(data));
                        window.dispatchEvent(new Event("reset.session.request"));
                        resolve(data);
                    },
                    error: (data: any) => {
                        reject(data);
                    },
                });
            } else {
                resolve(JSON.parse(session));
            }
        });
    }
}

export default new DataSessions();