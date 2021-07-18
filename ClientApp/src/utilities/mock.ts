export class Mock<T> {
    private mockedValue: T | undefined;
    private isMocked: boolean;
  
    constructor() {
      this.mockedValue = undefined;
      this.isMocked = false;
    }
  
    makeAccessor = (accessor: () => T) => () => {
      if (this.isMocked) {
        return this.mockedValue as T;
      } else {
        return accessor();
      }
    };
  
    setMockedValue = (value: T) => {
      this.mockedValue = value;
      this.isMocked = true;
    };
  
    reset = () => {
      this.mockedValue = undefined;
      this.isMocked = false;
    };
  }
  