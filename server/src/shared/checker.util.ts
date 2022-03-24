export interface CheckerCollection {
  argument: any;
  argumentName: string;
}

export type CheckerCollections = CheckerCollection[];

export interface CheckerResponse {
  succeed: boolean;
  message: string;
}

export class Checker {
  public static isEmptyStringOrUndefined(value: string): CheckerResponse {
    if (value === "") {
      return {
        succeed: false,
        message: `${value} is Empty`,
      };
    }
    if (value === undefined) {
      return {
        succeed: false,
        message: `${value} is Undefined`,
      };
    }

    return {
      succeed: true,
      message: "",
    };
  }

  public static isNullOrUndefined(value: any) {
    if (value === null) {
      return {
        succeed: false,
        message: `${value} is Null`,
      };
    }
    if (value === undefined) {
      return {
        succeed: false,
        message: `${value} is Undefined`,
      };
    }

    return {
      succeed: true,
      message: "",
    };
  }

  public static isNullOrUndefinedBulk(collections: CheckerCollection[]) {
    collections.forEach((collection: CheckerCollection) => {
      if (collection === null) {
        return {
          succeed: false,
          message: `${collection} is Null`,
        };
      }
      if (collection === undefined) {
        return {
          succeed: false,
          message: `${collection} is Undefined`,
        };
      }
    });

    return {
      succeed: true,
      message: "",
    };
  }
}
