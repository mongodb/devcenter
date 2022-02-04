const fetch = jest.fn();

export default fetch;

export class Response {
    response: string;
    status: number;
    constructor(response: string | object, status: number = 200) {
        typeof response == 'object'
            ? (this.response = JSON.stringify(response))
            : (this.response = response);
        this.status = status;
    }

    json = async (): Promise<object> => {
        return JSON.parse(this.response);
    };

    text = async (): Promise<string> => {
        return this.response;
    };
}
