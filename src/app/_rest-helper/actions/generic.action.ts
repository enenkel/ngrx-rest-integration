export type GenericActionTypes = "LoadAll" | "LoadAllSuccess";

export class GenericActions {
    actionName: string;
    resourcePath: string;

    getAllType(): string {
        return `[${this.actionName}] Load all`;
    }

    getAllSuccessType(): string {
        return `${this.getAllType()} success`;
    }

    getAllErrorType(): string {
        return `${this.getAllType()} error`;
    }

    getType(type: GenericActionTypes): string {
        switch (type) {
            case "LoadAll":
                return this.getAllType();
            case "LoadAllSuccess":
                return this.getAllSuccessType();
        }
    }
}
