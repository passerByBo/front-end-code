abstract class INooodles {
  public abstract desc(): void;
}

class LzNoodles extends INooodles {
  public desc(): void {
    console.log("兰州拉面");
  }
}
class PaoNoodles extends INooodles {
  public desc(): void {
    console.log("泡面");
  }
}

class RgNoodles extends INooodles {
  public desc(): void {
    console.log("热干面");
  }
}

class SimNoodlesFactory {
  public static TYPE_LZ: number = 1;
  public static TYPE_PAO: number = 1;
  public static TYPE_RG: number = 1;

  public static createNoodles(type: number):INooodles {
    switch (type) {
      case SimNoodlesFactory.TYPE_LZ:
        return new LzNoodles();
      case SimNoodlesFactory.TYPE_PAO:
        return new PaoNoodles();
      case SimNoodlesFactory.TYPE_RG:
        return new RgNoodles();
    }
  }
}

const noodles:INooodles = SimNoodlesFactory.createNoodles(SimNoodlesFactory.TYPE_LZ)
