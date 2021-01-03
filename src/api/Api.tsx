export class Api {

    get(url: string, success: (data: any) => void, error?: (message: string) => void, final?: () => void) {
        fetch(url, { method: 'get' })
            .then(async response => {
                if (response.ok) {
                    success(await response.json());
                }
                else {
                    console.log(response.status, response.statusText);
                }
            })
            .catch((message: string) => {
                if (error) {
                    error(message);
                }
                else {
                    throw new Error(message);
                }
            })
            .finally(() => {
                if (final) {
                    final();
                }
            }
        );
    }

    post(url: string, data: any, success: () => void, error?: (message: string) => void, final?: () => void) {
        let formData = this.objectToFormData(data);
        fetch(url, { method: 'post', body: formData })
            .then(response => {
                if (response.ok) {
                    success();
                }
                else {
                    console.log(response.status, response.statusText);
                }
            })
            .catch((message: string) => {
                if (error) {
                    error(message);
                }
                else {
                    throw new Error(message);
                }
            })
            .finally(() => {
                if (final) {
                    final();
                }
            }
        );
    }

    postWithResponse(url: string, data: any, success: (data: any) => void, error?: (message: string) => void, final?: () => void) {
        let formData = this.objectToFormData(data);
        fetch(url, { method: 'post', body: formData })
            .then(async response => {
                if (response.ok) {
                    success(await response.json());
                }
                else {
                    console.log(response.status, response.statusText);
                }
            })
            .catch((message: string) => {
                if (error) {
                    error(message);
                }
                else {
                    throw new Error(message);
                }
            })
            .finally(() => {
                if (final) {
                    final();
                }
            }
            );
    }

    delete(url: string, success: () => void, error?: (message: string) => void, final?: () => void) {
        fetch(url, { method: 'delete' })
            .then(response => {
                if (response.ok) {
                    success();
                }
                else {
                    console.log(response.status, response.statusText);
                }
            })
            .catch((message: string) => {
                if (error) {
                    error(message);
                }
                else {
                    throw new Error(message);
                }
            })
            .finally(() => {
                if (final) {
                    final();
                }
            }
        );
    }

    objectToFormData(obj: any, form?: FormData, namespace?: string) {

        var fd = form || new FormData();
        var formKey;

        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {

                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }

                // if the property is an object, but not a File,
                // use recursivity.
                if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                    this.objectToFormData(obj[property], fd, property);

                } else {

                    // if it's a string or a File object
                    fd.append(formKey, obj[property]);
                }

            }
        }
        return fd;
    };
}