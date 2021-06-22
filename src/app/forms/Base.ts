import { observable } from 'mobx';
import * as _ from 'lodash';
import { classToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const getErrors = async (v: any): Promise<{ [key: string]: string }> => {
  /**
   * v is a Validator Class (idk how to type it w/ out the inheritance)
   * This helper function transforms the class using class-transformer
   *     in order to utilize the @Type decorator and then calls class-validator
   *
   * it recurses in order to find all the errors within the nested validator classes
   *
   *
   * ex. output
   * {
   *      displayName: "error",
   *      contact.email: "error"
   * }
   */
  const c = classToClass(v);
  const errors = await validate(c);
  const out: any = {};
  const recurse = (root: string, errors: ValidationError[]) => {
    for (const error of errors) {
      const property = [root, error.property]
        .filter((val) => val != '')
        .join('.');
      recurse(property, error.children);

      const constraints = Object.values(error.constraints || {});
      if (constraints.length > 0) {
        // only shows the first constraint right now
        out[property] = constraints[0];
      } else {
        out[property] = 'error';
      }
    }
  };
  recurse('', errors);
  return out;
};

interface meta_i {
  conversions?: {
    to: string | { key: string; cast: any };
    from: string | { key: string; cast: any };
  }[];
}

export class BaseFormModel<FormInterface, DBInterface> {
  @observable errors: {};
  @observable data: FormInterface;
  func: any;

  @observable
  state: {
    loaded: boolean;
    loading: boolean;
  };

  @observable
  _response: Response;
  @observable
  responseBody: DBInterface = {} as DBInterface;

  @observable
  isValid = false;

  meta: meta_i;
  constructor(private validator?: new () => any) {
    this.errors = {};
    this.data = {} as FormInterface;

    this.state = {
      loaded: false,
      loading: false,
    };

    // this.func = _.debounce(this.validate, 200, {leading: true})
  }

  get response() {
    return this._response;
  }

  setResponse = async (response: Response) => {
    this._response = response;
    try {
      this.responseBody = await response.json();
    } catch (e) {
      console.warn(e);
    }
  };

  get message() {
    let msg = this.responseBody['message'] || '';
    if (typeof msg != 'string') {
      msg = msg.join(', ');
    }
    return msg;
  }

  onChange = (key: string) => {
    /**
     * key can be nested "contact.phone"
     */
    return (value) => {
      _.set(this.data, key, value);
      this.validate();
    };
  };

  get(key) {
    return _.get(this.data, key);
  }

  getError(key) {
    return _.get(this.errors, key);
  }

  copy(data) {
    return _.cloneDeep(data);
  }
  onInputChange = (key: string) => {
    return (e) => {
      const value = e.target.value;
      _.set(this.data, key, value);
      this.validate();
    };
  };

  convert = (data, to: boolean, shouldCast = true) => {
    /**
     * takes the meta values and converts to / from server data model
     */
    const [key1, key2] = to ? ['to', 'from'] : ['from', 'to'];
    if (this.meta?.conversions) {
      // TODO figure out a way to get all the keys that are not listed in conversions to be present in 'out'
      // sufficient for now, but wasteful, therea re better ways to do this
      // let out = _.cloneDeep(data) as DBInterface
      const out = {};

      const { conversions } = this.meta;

      // all the keys in conversion
      for (const c of conversions) {
        const dkey1 = typeof c[key1] == 'object' ? c[key1].key : c[key1];
        const dkey2 = typeof c[key2] == 'object' ? c[key2].key : c[key2];
        const cast = c[key2].cast;
        const d = _.get(data, dkey1);
        const value = shouldCast ? (cast ? cast(d) : d) : d;
        value ? _.set(out, dkey2, value) : null; // only set the value if defined
        //    out[dkey2] = value
      }

      // all the keys in data not in conversions
      //    for(const d of Object.keys(data)){
      //    }

      return out;
    }
    return data;
  };

  toDB = (): DBInterface => {
    /**
     * To Be Impemented!
     *
     * use to export to db interface
     */

    const out = this.convert(this.data, false) as DBInterface;
    return out;
  };
  fromDB = (data: DBInterface) => {
    /**
     * To Be Impemented!
     *
     * use to import from db interface
     */

    const out = this.convert(data, true) as DBInterface;
    _.merge(this.data, out);
    return out;
  };

  reset = () => {
    /**
     * To Be Implemented!
     *
     * use to reset this.data when needed
     */
  };

  get success() {
    if (this.response == undefined) {
      return undefined;
    }
    return this.response.status >= 200 && this.response.status < 300;
  }

  public async call(url: string, options = {} as RequestInit) {
    /**
     * To Be Impemented!
     *
     * use to import from db interface
     */

    this.state.loading = true;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.toDB()),
        ...options,
      });
      await this.setResponse(response);
      this.state = {
        loading: false,
        loaded: true,
      };
      return this.success;
    } catch (e) {
      console.warn('ERROR', e);
      this.state = {
        loading: false,
        loaded: false,
      };
      return false;
    } finally {
    }
  }

  validate = _.debounce(
    async (): Promise<boolean> => {
      // use toDB because the validator is based on the toDB Value
      if (this.validator == undefined) {
        // if you can't validate form
        // i.e. public user info form
        this.isValid = true;
        return true;
      }

      const data = _.cloneDeep(this.toDB());
      const v = new this.validator();
      Object.assign(v, data);
      const errors = await getErrors(v);
      this.errors = this.convert(errors, true, false);
      console.log(errors, this.errors);
      this.isValid = Object.keys(this.errors).length == 0;
      return this.isValid;
    },
    200,
    { leading: true },
  );
}
